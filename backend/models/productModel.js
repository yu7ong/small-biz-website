import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
    }, 
    description: {
        type: String, 
        required: true 
    }, 
    price: {
        type: Number,
        required: true 
    },
    image: {
        type:Array, 
        required: true 
    }, 
    category: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true, 
        min: [0, 'Stock cannot be negative']
    }, 
    sizes: {
        type: Array,
        required: true
    }

})

const productModel = mongoose.models.product || mongoose.model("product", productSchema)

export default productModel