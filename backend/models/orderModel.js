import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: true, 
    }, 
    payment: {
        type: Boolean, 
        required: true,
        default: false
    }, 
    date: {
        type: Number,
        required: true 
    }, 
    details: {
        type: String, 
        required: true
    }
})

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema)

export default orderModel