import express from "express";
import checkJwt from '../middlewares/auth0.js';

import {allUsers,userProfile,userLoggin,Admins,createUser,updateUser,updateUserAdmin} from '../controllers/UsersController.js'
import {userAuthorize} from '../controllers/authorize.js'
const router = express.Router();



// router.use(checkJwt)
router.get('/client/authorize?',userAuthorize);

router.get('/', allUsers)
router.put('/:id',updateUser)
router.post('/:email', userLoggin)
router.get('/find/:id', userProfile)
router.get('/admin', Admins)
router.post('/admin/newuser', createUser)
router.put('/admin/:id', updateUserAdmin)

export default router