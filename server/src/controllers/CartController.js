import cartModel from '../models/cart.js'
import userModel from '../models/user.js'


export const getCart = async (req,res)=>{
    const{userId}=req.query;
    const cart= await cartModel.find({})
    if(userId){
        const result=cart.filter(f=>f.userId===userId)
        if(result){
            res.status(200).json(result)
        }else{
            res.status(404).json({msj:'purchase no font'})
        }
    }else{
        res.status(200).json(cart)
    }
}


export const createCart = async (id)=>{
    const cartIf= await cartModel.findOne({userId:id})
    if(!cartIf){

        const newcart= new cartModel({
            userId:id
        })
        const created= await newcart.save()
        console.log(created)
        return true
    }else return false
}


export const updateCart= async(req,res)=>{
    const { id } = req.params
    console.log(req.body)
   try {
    const user= await userModel.findOne({_id:id})
    console.log(user)
    if(user){
        await cartModel.findOneAndUpdate({userId:id},{
            products:req.body
        },{ new: true })
        .then(()=>{
            res.status(200).json({msj:'Cart modified successfully'})
        })
    }
   } catch (error) {
        res.status(400).json({msj:'Couldnt modify the cart, Something went wrong',error:error})
   }
}