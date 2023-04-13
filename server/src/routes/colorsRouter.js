import express from 'express'
import colorModel from '../models/color.js'
const router = express.Router();


router.get('/', async (req, res, next) => {
    try{
        const response = await colorModel.find({})
        const Colors = response?.map( C => {
            const color = {
                id: C._id,
                name: C.name,
            }
            return color;
        })
        if(Colors.length > 0){
            res.status(200).send(Colors)
        }
        else { 
            res.status(200).json({ msg: "No colors saved"})
        }
    } catch (error){
        next(error)
    }
})

export default router


