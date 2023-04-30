import express from "express";
import {
  getSales,
  getPurchases,
  getUsersLog,
  getProductsBestValued,
} from "../controllers/statsController.js";

const router = express.Router();
/////////////////////////////////////////////
router.get("/sales", getSales);
router.get("/purchases", getPurchases);
router.get("/users", getUsersLog);
router.get("/bestproducts", getProductsBestValued);

/////////////////////////////////////////////

export default router;
