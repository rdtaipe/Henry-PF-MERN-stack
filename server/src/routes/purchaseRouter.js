import express from "express";
import {getPurchase, createPurchase, updatePurchase} from '../controllers/PurchaseController.js'

const router = express.Router();
////////////////////////////////////////
router.get('/', getPurchase)
router.post('/', createPurchase)
////////////////////////////////////////
router.put('/:id',updatePurchase)

export default router