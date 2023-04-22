import express from "express";
import { getAllCart,getCartById,updateCart,deliteCart} from '../controllers/CartController.js'

const router = express.Router()

router.get('/cart',getAllCart)
router.get('/cart/:id',getCartById)
router.put('/cart/:id',updateCart)
router.delete('/cart/:id',deliteCart)

export default router