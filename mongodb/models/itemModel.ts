const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  images: {
    type: Array,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
  },
  sizes: {
    type: Array,
    required: true,
  },
  new: {
    type: Boolean,
    required: true,
  },
});

const Item = mongoose.models.Item || mongoose.model("Item", itemSchema);
export default Item;
