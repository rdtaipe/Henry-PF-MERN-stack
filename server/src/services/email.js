import express from 'express';
import send from '../utils/mail/send.js';
import UserModel from '../models/user.js';


const router = express.Router();

router.get('/', async (req, res) => {
    try {
        var sending = await send({model:UserModel,body:req.body})
        res.status(200).json({ send: true, message: sending });
    } catch (err) {
        res.status(500).json({ send: false, message: 'Server error' });
    }
});



export default router;