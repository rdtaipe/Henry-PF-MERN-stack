import express from "express";
import { getProducts, getProductById, createProducts, updateProduct, deleteProduct } from "../controllers/ProductsController.js";

import upload from "../middlewares/multer_config.js";// multer es necesario para el manejo de imagenes

const router = express.Router();
////////////////////////////////////
router.get("/", getProducts);
router.post("/",upload.single('image'),createProducts);
/////////////////////////////////////
router.get("/:id", getProductById);
router.put("/:id",updateProduct);
router.delete("/:id",deleteProduct);


export default router;