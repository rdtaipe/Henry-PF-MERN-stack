import Products from "../models/product.js";

export const getProducts = async (req, res) => {
    const { name } = req.query
    const allProducts = await Products.find({})
    if (allProducts) {
        if (name) {
            const result = allProducts.filter((f) =>
                f.name.toLocaleLowerCase().includes(name)
            )
            result
                ? res.status(200).json(result)
                : res.status(400).json({ message: 'Product not found' })
        } else {
            res.status(200).json(allProducts)
        }
    } else {
        res.status(400).json({ message: 'Product not found' })
    }


}
export const getProductById = async (req, res) => {
    const { id } = req.params
    const allProducts = await Products.find({})
    if (allProducts) {
        if (id) {
            const result = allProducts.filter((f) => f.id === id)
            result
                ? res.status(200).json(result)
                : res.status(400).json({ msj: 'Product not found' })
        }
    } else {
        res.status(400).json({ msj: 'Product not found' })
    }
}

export const createProducts = async (req, res) => {
    const { name,description,stock,color,size,category,image,genre,brand,price,featured,active} = req.body

    if (!name || !description || !stock || !color || !genre || !price || !size || !category || !brand) {  
        res.status(400).json({ msj: 'All fields are required' })
    }
   
    try {
        const newProduct = new productModel({
            name,
            description,
            stock,
            color,
            size,
            category,
            image: image || "https://www.pngall.com/wp-content/uploads/2016/03/Clothes-Transparent.png",
            genre,
            brand,
            price,
            active: active || true,
            featured: featured || false
        })
        const product = await newProduct.save()
        console.log(product)
        res.status(200).json({ msj: 'product created successfully' })
    } catch (err) {
        console.log(err)
    }
 
}
export const updateProduct = async (req,res) =>{
    const { id } = req.params
    const {name,description,stock,color,size,category,image,genre,brand,price,active,featured} = req.body

    if ( !name || !description || !stock || !color || !size || !category || !genre || !brand ||!price) {
        res.status(400).json({ msj: 'All fields are required' })
    } 
    else {
        try {
            await Products.findByIdAndUpdate( 
                id,
                {
                    name: name,
                    description: description,
                    stock: stock,
                    color: color,
                    size: size,
                    category: category,
                    image: image,
                    genre: genre,
                    brand: brand,
                    price: price,
                    active: active,
                    featured: featured
                },
                { new: true } // este ultimo parámetro hace que nos devuelva el doc actualizado
            ) 
            .then(() => {
                res.status(200).json({msj: 'Product Successfully Updated'})
            })
        } catch (err) {
            console.log(err)
            res.status(400).json({ msj: 'The Current Product does not exist' })
        }
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const product = await Products.findById(req.params.id);
        await product.remove();
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}