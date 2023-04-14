import express from "express";
import {Reviews, createReview, updateReview} from '../controllers/ReviewsController.js'

const router = express.Router()
/////////////////////////////////////////////
router.get('/reviews', Reviews)
router.post('/reviews', createReview)
router.put('/reviews', updateReview)
/////////////////////////////////////////////

export default router