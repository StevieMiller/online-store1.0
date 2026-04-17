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
const PORT = process.env.PORT ||5000;

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

app.post('/api/orders', async (req, res) => {
  const { customer, items, total } = req.body;

  const FRONTEND_URL = 'https://online-store1-0.onrender.com';

const itemsHtml = items
  .map((item) => {
    const imageUrl = item.image?.[0]
      ? `${FRONTEND_URL}${item.image[0]}`
      : '';

    return `
      <div style="margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #ccc;">
        ${imageUrl ? `<img src="${imageUrl}" alt="${item.name}" style="width: 100px; height: auto; display: block; margin-bottom: 10px;" />` : ''}
        <p style="margin: 0 0 6px 0;"><strong>${item.name}</strong></p>
        <p style="margin: 0 0 4px 0;">Price: $${item.price}</p>
        <p style="margin: 0 0 4px 0;">Quantity: ${item.quantity}</p>
        <p style="margin: 0;">Line Total: $${item.price * item.quantity}</p>
      </div>
    `;
  })
  .join('');

  try {
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
      html: `
  <h2>New Order Received</h2>

  <p><strong>Name:</strong> ${customer.name}</p>
  <p><strong>Email:</strong> ${customer.email}</p>
  <p><strong>Address:</strong><br>${customer.address}</p>

  <h3>Items</h3>
  ${itemsHtml}

  <h3>Total: $${total}</h3>
`,
    });

    res.json({ message: 'Order emailed successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});