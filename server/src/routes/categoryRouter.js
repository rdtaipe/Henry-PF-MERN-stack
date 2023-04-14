import express from 'express'
import {allCategory, updateCategory, createCategory} from '../controllers/CategoryController.js'


const router = express.Router()
//////////////////////////////////////////
router.get('/', allCategory)
router.put('/',updateCategory)
router.post('/', createCategory)

export default router