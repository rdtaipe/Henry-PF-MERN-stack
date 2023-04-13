import express from "express";
import product from '../models/product.js'
import user from "../models/user.js";

const router = express.Router();

const models = {
    product,
    user,
};

router.get(`/module/:name`,async (req, res) => {
    const fixtype = (v) => (Object.values(v).toString().split(" ")[1].replaceAll("(", "").replaceAll(")", "").toLowerCase())

    try{
        const {name} = req.params;
        const model =models[name]

        if(!model){ return res.status(404).json({message:"Model not found"})}
  
        const value = Object.values(model.schema.obj)
        const keys = Object.keys(model.schema.obj)
 
        var newArray = []
        value.map((item,i)=>{
                const type = fixtype(item)
            newArray.push({
                key:keys[i],
                type:type,
                attributes:item
            })
        })
        res.status(200).json(newArray);
    }
    catch(err){
        res.status(404).json({message:"Model not found",error:err.message})
    }

   })



export default router;