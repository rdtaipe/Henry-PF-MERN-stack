import express from "express";
import {allUsers,userProfile,userLoggin,Admins,createUser,updateUser,updateUserAdmin} from '../controllers/UsersController.js'

const router = express.Router();
////////////////////////////////




////////////////////////////////
router.get('/', allUsers)
////////////////////////////////
router.put('/:id',updateUser)
////////////////////////////////
router.post('/:email', userLoggin)
////////////////////////////////
router.get('/find/:id', userProfile)
////////////////////////////////
router.get('/admin', Admins)
router.post('/admin/newuser', createUser)
router.put('/admin/:id', updateUserAdmin)
////////////////////////////////

export default router