import express from "express";
import checkJwt from '../../middlewares/auth0.js';
import userModel from "../../models/user.js";
import { allUsers, userProfile, userLoggin, Admins, createUser, updateUser, updateUserAdmin } from '../../controllers/UsersController.js'
import { userAuthorize } from '../../controllers/authorize.js'
const router = express.Router();

// router.use(checkJwt)
router.get('/authorize', userAuthorize);

router.get('/', allUsers)
router.put('/:id', updateUser)
router.post('/:email', userLoggin)
router.get('/find/:id', userProfile)
router.get('/admin', Admins)
router.post('/admin/newuser', createUser)
router.put('/admin/:id', updateUserAdmin)

/* ESTO NO VA ES PARA BORRAR MI USUARIO PARA HACER PRUEBAS */
router.delete("/:id", async (req, res) => {
    const { id } = req.params
    const userDeleted = await userModel.findByIdAndDelete(id)
    res.json(userDeleted)
})

export default router