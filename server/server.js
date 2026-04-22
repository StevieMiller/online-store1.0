// Import Express (backend framework for building APIs)
const express = require('express');

// Import CORS (allows frontend to communicate with backend)
const cors = require('cors');

// Import Mongoose (MongoDB object modeling tool)
const mongoose = require('mongoose');

// Import Nodemailer (for sending emails)
const nodemailer = require('nodemailer');

// Load environment variables from .env file
require('dotenv').config();

// Import Product model
const Product = require('./models/Product');

// Create the Express app
const app = express();

// Define the port the server will run on
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log('incoming request:', req.method, req.url);
  next();
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

app.get('/', (req, res) => {
  res.send('API is running');
});

// GET all products from MongoDB
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET a single product by ID from MongoDB
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// POST a new product to MongoDB
app.post('/api/products', async (req, res) => {
  try {
    const {
      name,
      price,
      category,
      condition,
      size,
      color,
      brand,
      description,
      image,
      inventory,
      sku,
    } = req.body;

    const newProduct = new Product({
      name,
      price,
      category,
      condition,
      size: size || '',
      color: color || '',
      brand: brand || '',
      description: description || '',
      image: Array.isArray(image) ? image : [],
      inventory: inventory ?? 1,
      sku: sku || '',
    });

    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// POST order request and send plain text email
app.post('/api/orders', async (req, res) => {
  const { customer, items, total } = req.body;

  try {
    // First, verify that all items exist and have enough inventory
    for (const item of items) {
      const product = await Product.findById(item._id);

      if (!product) {
        return res.status(404).json({
          message: `Product not found for item: ${item.name}`,
        });
      }

      if (product.inventory < item.quantity) {
        return res.status(400).json({
          message: `${product.name} is out of stock or does not have enough inventory`,
        });
      }
    }

    // If all items are valid, reduce inventory
    for (const item of items) {
      const product = await Product.findById(item._id);
      product.inventory -= item.quantity;
      await product.save();
    }

    const itemList = items
      .map(
        (item) =>
          `${item.name} | SKU: ${item.sku} | Qty: ${item.quantity} | $${item.price} | Line: $${item.price * item.quantity}`
      )
      .join('\n');

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'New Order Request',
      text: `
New Order Received

Name: ${customer.name}
Email: ${customer.email}
Address: ${customer.address}

Items:
${itemList}

Total: $${total}
      `,
    });

    res.json({ message: 'Order emailed successfully and inventory updated' });
  } catch (error) {
    console.error('Order error:', error);
    res.status(500).json({ message: 'Failed to process order' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});