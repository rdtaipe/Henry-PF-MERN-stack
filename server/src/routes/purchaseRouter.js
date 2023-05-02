import express from "express";
import { getPurchase, getPurchaseById, createPurchase, updatePurchase } from '../controllers/PurchaseController.js'

const router = express.Router();
////////////////////////////////////////
router.get('/', getPurchase)
router.get('/:userId',getPurchaseById)
router.post('/', createPurchase)
////////////////////////////////////////
router.put('/:id', updatePurchase)

export default router