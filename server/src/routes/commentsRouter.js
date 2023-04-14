import express from 'express'
import commentModel from '../models/comments.js'
const router = express.Router();


router.get('/', async (req, res, next) => {
    try{
        const response = await commentModel.find({})
        const comments = response?.map( C => {
            const mess = {
                id: C._id,
                name: C.name,
                email: C.email,
                message: C.message
            }
            return mess;
        })
        if(comments.length > 0){
            res.status(200).send(comments)
        }
        else { 
            res.status(200).json({ msg: "There're no comments yet"})
        }
    } catch (error){
        next(error)
    }
})

router.post('/send', async (req, res) => {
    try{
        const {name, email, message} = req.body

        if(message){

            await commentModel.create({
                name,
                email,
                message
            })
            res.status(201).send('Comment saved in the db')

        } else res.status(406).send("There isn't comment to save")

    } catch (error) {
        console.log('Error sending the comment');
        next(error)
    }
})

export default router