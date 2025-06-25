import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    orderId: {
        type: String, 
        required: true, 
    }, 
    productId: {
        type: String, 
        required: true, 
    }, 
    variantId: {
        type: String,
        required: true 
    }, 
    quantity: {
        type: Number, 
        required: true
    }
})

const orderItemModel = mongoose.models.orderItem || mongoose.model("orderItem", orderItemSchema)

export default orderItemModel