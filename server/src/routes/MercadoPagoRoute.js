import express from "express";
import {payment,success,failure,pending} from "../controllers/MercadoPago.js";

const router = express.Router();

router.post('/', payment);
// success: 
// failure: "",
// pending:
router.get('/success/:id', success);
router.get('/failure/id', failure);
router.get('/pending/id', pending);

export default router;