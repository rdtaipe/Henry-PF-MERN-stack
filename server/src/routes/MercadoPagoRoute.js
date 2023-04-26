import express from "express";
import getPay from "../controllers/MercadoPago.js";

const router = express.Router();

router.post('/', getPay);

export default router;