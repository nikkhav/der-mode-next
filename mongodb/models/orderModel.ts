const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "Please enter your user id"],
  },
  items: {
    type: Array,
    required: [true, "Please enter your items"],
  },
  totalSum: {
    type: Number,
    required: [true, "Please enter your total summary"],
  },
  date: {
    type: String,
    required: [true, "Please enter your date"],
  },
  phone: {
    type: String,
    required: [true, "Please enter your phone"],
  },
  streetAndNumber: {
    type: String,
    required: [true, "Please enter your street and number"],
  },
  entranceAndFloor: {
    type: String,
    required: [true, "Please enter your entrance and floor"],
  },
  flat: {
    type: String,
    required: [true, "Please enter your flat"],
  },
  comment: {
    type: String,
  },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
