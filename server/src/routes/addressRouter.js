import { getAddress, createAddress, updateAddress } from '../controllers/AddressController.js'
import express from "express";

const router = express.Router();
//////////////////////////////////////
router.get('/', getAddress)
router.post('/', createAddress)
router.put('/', updateAddress)

export default router