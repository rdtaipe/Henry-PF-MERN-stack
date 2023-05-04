import express from "express";
import {
  getSales,
  getPurchases,
  getProductsBestValued,
  getProductsGenres,
  getUsersGenres,
  getProductWithoutStock,
  getProductMoreSold
} from "../controllers/statsController.js";

const router = express.Router();
/////////////////////////////////////////////
router.get("/sales", getSales);
router.get("/purchases", getPurchases);
router.get("/usersgenres", getUsersGenres);

/* products */
router.get("/bestproducts", getProductsBestValued);
router.get("/genreproducts", getProductsGenres);
router.get("/whitoutstock", getProductWithoutStock);
router.get("/moresold", getProductMoreSold);

/////////////////////////////////////////////

export default router;
