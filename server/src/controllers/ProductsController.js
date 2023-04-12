
import Products from "../models/Products.js";

export const getProducts = async (req, res) => {

    try {
        const products = await Products.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const getProductById = async (req, res) => {
    try {
        const product = await Products.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createProducts = async (req, res) => {

    try{
        const product = req.body;
        const newProduct = new Products(product);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch(error){
        res.status(409).json({ message: error.message });
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