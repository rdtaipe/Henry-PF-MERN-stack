import purchaseModel from '../models/purchase'
import userModel from '../models/user'
import cartModel from '../models/cart'
import productModel from '../models/product'
///////////////////////////////////////////////
import {GetMP} from './MP'


export const getPurchase = async (req, res, next) =>{
    const{userId, purchaseId} = req.query;
    const purchases = await purchaseModel.find({})

    try{
        if (userId){

            const result = purchases.filter(f => f.userId === userId)
            if(result){
                res.status(200).json(result)
            } else{
                res.status(404).json({msj:'purchase not found'})
            }

        } else if (purchaseId){

            const result = purchases.filter(f => f.id === purchaseId)
            if(result){
                res.status(200).json(result)
            } else{
                res.status(404).json({msj:'purchase not found'})
            }
        } else res.status(200).json(purchases)
    } catch (error) {
        console.log(error)
        next(error)
    }
}


export const CreatePurchase = async (req, res, next) => {
    const{paymentId,userId,products,addresId} = req.body
    if(!paymentId||!userId||!products||!addresId){
        res.status(404).json( {msj:'campos requeridos'})
    }

    try {
        const getmp= await GetMP(paymentId)
        //console.log(getmp)
        if(getmp){
            const create = new purchaseModel({
                paymentId: paymentId,
                userId: userId,
                products: products,
                addresId: addresId,
                time: new Date(),
                state:'In-Process'
            })
            await create.save()

            const user = await userModel.findOne({userId:userId})
            //console.log(user)
            if(user){
                await cartModel.findOneAndUpdate({userId:userId},{
                    products:[]
                },{ new: true })
                .then((r)=>{
                    console.log(r)
                })
                
            }
            products.forEach(async(p)=> {
            //console.log('soy los productos: ',p)
            await actualizarStock(p)
            })
            res.status(201).json( {msj:'purchase created'})
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export async function actualizarStock(product){
    let produc= await productModel.findById({_id:product.id})
    
    if(produc){
        const size=produc.size.map(p=>{
            if(p.size===product.size.size){
                const stock=p.stock-product.count
                return{
                    size:p.size,
                    stock:p.stock-product.count
                }
            }else{
                return p
            }
        })
        
        await productModel.findByIdAndUpdate(product.id,{
            size:size
        },{ new: true })
        .then((e)=>console.log(e))
    }
}


export const updatePurchase = async (req, res, next) =>{

    const { id } = req.params
    const { state } = req.body

    try{
        await purchaseModel.findByIdAndUpdate( id, { state: state },
            
            { new: true } // este ultimo parámetro hace que nos devuelva el user actualizado
        )
        .then(() => {
            res.status(200).send('Purchase Successfully Updated')
        })
    } catch (error) {
        console.error('Error updating purchase')
        next(error)
    }
}