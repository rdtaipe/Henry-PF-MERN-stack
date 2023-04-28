import express from "express";
import {getSales,getPurchases} from '../controllers/statsController.js'

const router = express.Router()
/////////////////////////////////////////////
router.get('/sales', getSales)
router.get('/purchases', getPurchases)

/////////////////////////////////////////////

export default router