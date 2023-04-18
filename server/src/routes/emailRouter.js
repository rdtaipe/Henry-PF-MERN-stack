import express  from "express";
import { emailerConfig } from "../controllers/emailerController.js";


const router = express.Router()


router.post('/sendEmail', emailerConfig )

export default router