import productsModel from "../models/product.js";

export const getProducts = async (req, res) => {
    const { name } = req.query
    const allProducts = await productsModel.find({})
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
    const allProducts = await productsModel.find({})
    if (allProducts) {
        if (id) {
            const result = allProducts.filter((f) => f.id === id)
            result
                ? res.status(200).json(result)
                : res.status(400).json({ message: 'Product not found' })
        }
    } else {
        res.status(400).json({ message: 'Product not found' })
    }
}

export const createProducts = async (req, res) => {
     console.log(req.body)
    // console.log(req.params)
    // console.log(req.query)
    // console.log(req)
    const newProduct = new productsModel(req.body);
    if (!newProduct) {  
        res.status(400).json({ message: 'All fields are required' })
    }
    try {
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
 
}
export const updateProduct = async (req,res) =>{
    const { id } = req.params
    const {name,description,stock,color,size,category,image,genre,brand,price,active,featured} = req.body

    if ( !name || !description || !stock || !color || !size || !category || !genre || !brand ||!price) {
        res.status(400).json({ message: 'All fields are required' })
    } 
    else {
        try {
            await productsModel.findByIdAndUpdate( 
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
                res.status(200).json({message: 'Product Successfully Updated'})
            })
        } catch (err) {
            console.log(err)
            res.status(400).json({ message: 'The Current Product does not exist' })
        }
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const product = await productsModel.findById(req.params.id);
        await product.remove();
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}