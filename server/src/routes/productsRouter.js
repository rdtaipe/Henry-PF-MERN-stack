import express from "express";
import {
  getProducts,
  getProductById,
  createProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/ProductsController.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();
////////////////////////////////////
router.get("/", verifyToken, getProducts);
router.post("/", createProducts);
/////////////////////////////////////
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
