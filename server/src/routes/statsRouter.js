import express from "express";
import {
  getSales,
  getPurchases,
  getProductsBestValued,
  getProductsGenres,
  getUsersGenres,
} from "../controllers/statsController.js";

const router = express.Router();
/////////////////////////////////////////////
router.get("/sales", getSales);
router.get("/purchases", getPurchases);
router.get("/usersgenres", getUsersGenres);

/* products */
router.get("/bestproducts", getProductsBestValued);
router.get("/genreproducts", getProductsGenres);


/////////////////////////////////////////////

export default router;
