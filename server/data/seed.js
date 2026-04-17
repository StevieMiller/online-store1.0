const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });
const Product = require('../models/Product');

const products = [
  {
    name: 'Red Shirt',
    category: 'shirts',
    price: 25,
    description: 'Simple red shirt',
    inventory: 10,
    image: '/images/red-shirt.png'
  },
  {
    name: 'Blue Shirt',
    category: 'shirts',
    price: 25,
    description: 'Simple blue shirt',
    inventory: 8,
    image: '/images/blue-shirt.png'
  },
  {
    name: 'Denim Jeans',
    category: 'pants',
    price: 40,
    description: 'Casual denim jeans',
    inventory: 5,
    image: '/images/denim-jeans.png'
  },
  {
    name: 'Black Pants',
    category: 'pants',
    price: 45,
    description: 'Formal black pants',
    inventory: 7,
    image: '/images/black-pants.png'
  }
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('Products seeded');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Seeding error:', err);
  });