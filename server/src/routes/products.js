import express from "express";
import { getProducts, getProductById, createProducts, updateProduct, deleteProduct } from "../controllers/ProductsController.js";

const router = express.Router();
////////////////////////////////////
router.get("/", getProducts);
router.post("/", createProducts);
/////////////////////////////////////
router.get("/:id", getProductById);
router.post("/:id",updateProduct);
router.delete("/:id",deleteProduct);


export default router;