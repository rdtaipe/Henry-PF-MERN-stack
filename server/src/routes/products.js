import express from "express";
import { getProducts, getProductById, createProducts, deleteProduct } from "../controllers/ProductsController.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", createProducts);
router.delete("/:id",deleteProduct);


export default router;