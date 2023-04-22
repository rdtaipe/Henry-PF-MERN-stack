import express from "express";
import { getAllCart,getCartById,updateCart,deliteCart} from '../controllers/CartController.js'

const router = express.Router()

router.get('/',getAllCart)
router.get('/:id',getCartById)
router.put('/:id',updateCart)
router.delete('/:id',deliteCart)

export default router