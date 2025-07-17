import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    minlength: [2, "Name must be at least 2 characters"],
    maxlength: [50, "Name cannot exceed 50 characters"],
  },
  date: {
    type: Date,
    required: true,
  },
  evidenceImg: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: false,
    maxlength: [500, "Details cannot exceed 500 characters"],
  },
});

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
