import express from 'express'
import { singleProductInfo, listProduct } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post('/single', singleProductInfo);
productRouter.get('/list', listProduct);

export default productRouter

