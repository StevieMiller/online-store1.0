const mongoose = require('mongoose');
const { NavbarBrand } = require('react-bootstrap');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  condition: String,
  size: String,   // changed
  color: String,  // changed
  brand: String,   // new field
  description: String,
  images: [String],
  inventory: { type: Number, default: 1 },
  sku: String,
});

module.exports = mongoose.model('Product', productSchema);