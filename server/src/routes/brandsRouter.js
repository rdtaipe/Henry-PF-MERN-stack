import { allBrands, updateBrand, createBrand } from "../controllers/BrandController.js"
import express from "express"

const router = express.Router();
/////////////////////////////////////////
router.get('/', allBrands)
router.post('/', createBrand)
router.put('/', updateBrand)

export default router