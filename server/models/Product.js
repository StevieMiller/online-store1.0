const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  condition: String,
  size: String,
  color: String,
  description: String,
  images: [String]
});

module.exports = mongoose.model('Product', productSchema);