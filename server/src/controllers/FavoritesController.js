import favoritesModel from "../models/favorite";


export const favoriteProduct = async(req,res) => {
    let {productId, userId} = req.body
    try {
        const newFavorite = new favoritesModel({
            product: productId,
            userId: userId
        })

        await newFavorite.save()
        res.status(201).json({
            msj: 'Favorite added'
        })
    } catch (error) {
        res.status(500).send('Something went wrong')
    }
}

export const getUserFavorites = async(req, res) => {
    let{userId} = req.params
    try {
        const queryAllfavorites = await favoritesModel.find({})
        const userFavorites = queryAllfavorites.filter(product => product.userId === userId)
        res.status(200).send(userFavorites)
    } catch (error) {
        res.status(500).send('something went wrong')
    }
}