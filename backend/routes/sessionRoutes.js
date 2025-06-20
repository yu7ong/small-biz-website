import express from 'express'
import {  updateCart, getCart  } from '../controllers/sessionController.js';

const sessionRouter = express.Router()

sessionRouter.post('/cart', updateCart)  
sessionRouter.get('/cart', getCart)  

export default sessionRouter