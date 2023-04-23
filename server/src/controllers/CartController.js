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
        const find = await cartModel.findOne({ id: id })
        if (!find) {
            res.status(404).json({ message: "find by id not found" })
        }
        res.status(200).json(find)

    } catch (error) {

    }
}

export const createCart = async (id) => {
    const cartIf = await cartModel.findOne({ id: id })
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
        const data = req.body.data
        if (!data.id) {
            res.status(400).json({ message: 'no product id' })
        }
        const findProduct = await cartModel.findOne({ id: id }).populate('products')
        const newProduct = [...findProduct.products]

        if (findProduct) {//si el carrito existe
            const ifExist = findProduct.products.find((p) => p.id === data.id);
            if (ifExist) {//si el producto existe
                var index = newProduct.indexOf(ifExist);
                newProduct[index].total += 1
                newProduct[index].date = Date.now()
                findProduct.products = newProduct
                findProduct.save()
                res.status(200).json(findProduct)
            } else {//si el producto no existe
                const newProduct = {
                    id: data.id,
                    name: data.name,
                    price: data.price,
                    image: data.image,
                    total: 1,
                    date: Date.now(),
                    attr: data.attr
                }
                const createProduct = await cartModel.findOneAndUpdate({ id: id }, { $push: { products: newProduct } })
                res.status(200).json(createProduct)

            }
        } else {//si el carrito no existe
            const createProduct = await cartModel.findOneAndUpdate({ id: id }, {
                $push: {
                    products: data
                }
            })
            res.status(200).json(createProduct)
        }


    } catch (error) {
        res.status(400).json({ message: 'Couldnt modify the cart, Something went wrong', error: error.message })
    }
}

export const deliteCart = async (req, res) => {
    const { id } = req.params

    try {
        const data = req.body
        //type: 0=delete all, 1=delete one
        console.log(data)
        if (!data.id) {
            res.status(400).json({ message: 'no product id' })
        }
        const findCard = await cartModel.findOne({ id: id }).populate('products')
        if (!findCard) {
            return res.status(404).json({ message: "object not foud by id" });
        } {
            const newProduct = [...findCard.products]
            if (data.type === 0) {
                const ifExist = findCard.products.find((p) => p.id === data.id);
                if (ifExist) {//si el producto existe
                    var index = newProduct.indexOf(ifExist);
                    newProduct.splice(index, 1);
                    findCard.products = newProduct
                    findCard.save()
                }

            } else if (data.type == 1) {
                const ifExist = findCard.products.find((p) => p.id === data.id);
                if (ifExist) {//si el producto existe
                    if (ifExist.total > 1) {
                        var index = newProduct.indexOf(ifExist);
                        newProduct[index].total -= 1
                        newProduct[index].date = Date.now()
                        findCard.products = newProduct
                        findCard.save()
                    } else {
                        var index = newProduct.indexOf(ifExist);
                        newProduct.splice(index, 1);
                        findCard.products = newProduct
                        findCard.save()
                    }
                }

            }
        }
        res.status(200).json(findCard)

    } catch (error) {
        res.status(400).json({ message: "error in deliteCart", error: error.message })
    }
}