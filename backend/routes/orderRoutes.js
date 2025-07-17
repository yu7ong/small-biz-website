import express from "express";
import { placeOrder } from "../controllers/orderController.js";
import upload from "../middleware/multer.js";

const orderRouter = express.Router();

orderRouter.post(
  "/place",
  upload.single("evidenceImg"),
  placeOrder
);

export default orderRouter;
