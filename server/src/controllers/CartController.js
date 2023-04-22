import cartModel from '../models/cart.js'
import userModel from '../models/user.js'


export const getAllCart = async (req, res) => {
    try {
        const carts = await cartModel.find({})
        res.status(200).json(carts)
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}
export const getCartById = async (req, res) => {
    const { id } = req.params
    try {
        const find = await cartModel.findById(id)
        if (!find) {
            res.status(404).json({ message: "find by id not found" })
        }
        res.status(200).json(find)

    } catch (error) {

    }
}


export const createCart = async (id) => {
    const cartIf = await cartModel.findOne({ userId: id })
    if (!cartIf) {

        const newcart = new cartModel({
            userId: id
        })
        const created = await newcart.save()
        console.log(created)
        return true
    } else return false
}


export const updateCart = async (req, res) => {
    const { id } = req.params
    try {
        const update = await cartModel.findOneAndUpdate({ id: id }, {
            products: req.body
        }, {
            new: true
        })
        if (!update) {
            res.status(404).json({ message: 'update by id not found' })
        }
        res.status(200).json(update)

    } catch (error) {
        res.status(400).json({ message: 'Couldnt modify the cart, Something went wrong', error: error.message })
    }
}

export const deliteCart = async (req, res) => {
    const { id } = req.params
    try {
        const deleted = await cartModel.findByIdAndDelete(id)
        if (!deleted) {
            return res.status(404).json({ message: "object not foud by id" });
        }

    } catch (error) {
        res.status(400).json({ message: "error in deliteCart", error: error.message })
    }
}