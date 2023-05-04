import productsModel from "../models/product.js";
import { deleteImageLocal } from "../middlewares/multer_config.js";
import uploadCloudinary from "../middlewares/cloudinary.js";

export const getProducts = async (req, res) => {
  const { name } = req.query;
  const allProducts = await productsModel.find({});
  if (allProducts) {
    if (name) {
      const result = allProducts.filter((f) =>
        f.name.toLocaleLowerCase().includes(name)
      );
      result
        ? res.status(200).json(result)
        : res.status(400).json({ message: "Product not found" });
    } else {
      res.status(200).json(allProducts);
    }
  } else {
    res.status(400).json({ message: "Product not found" });
  }
};
export const getProductById = async (req, res) => {
  const { id } = req.params;
  const allProducts = await productsModel.find({});
  if (allProducts) {
    if (id) {
      // const result = allProducts.filter((f) => f.id === id)
      const result = allProducts.find((f) => f.id === id);
      result
        ? res.status(200).json(result)
        : res.status(400).json({ message: "Product not found" });
    }
  } else {
    res.status(400).json({ message: "Product not found" });
  }
};

//create products
export const createProducts = async (req, res, next) => {
  try {
    //destructuro porque debo trabajar el objeto en formas separada
    let {
      name,
      description,
      stock,
      color,
      size,
      category,
      genre,
      brand,
      price,
      active,
      feactured,
      cost,
    } = req.body;
    let file = req.file;

    let upload = await uploadCloudinary(file);
    //una vez subida la image ya puedo obtener su url .creo un objeto
    let objProduct = {
      name,
      description,
      stock,
      cost,
      color,
      size,
      category,
      genre: genre,
      brand,
      price,
      active,
      feactured,
      image: upload.secure_url,
    };
    //console.log('objeto producto \n',objProduct)

    const newProduct = await new productsModel(objProduct);
    if (!newProduct) {
      res.status(400).json({ message: "All fields are required" });
    }

    await newProduct.save();
    //middleware
    await deleteImageLocal(req, res, next); //elimino la imagen del local y continua
    return res.status(201).json(newProduct);
  } catch (error) {
    console.log(error.message);
    res.status(409).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  // console.log(id);

  const fix1=()=>{}
  try {
    const product = await productsModel.findById(id);
    if (!product) {
      return res.status(400).json({ message: "The Current Product does not exist" });
    }

    const updatedProduct = {};
    Object.keys(req.body).forEach((key) => {
     
      if(key!=="_id"&&key!=="createdAt"&&key!=="updatedAt"){
        
        if (req.body[key] !== product[key]) {
          console.log(product[key])
          updatedProduct[key] = req.body[key];
        }
      }
     
    });
    // console.log(updatedProduct)

    if (Object.keys(updatedProduct).length === 0) {
      return res.status(400).json({ message: "No fields were updated" });
    }

    const updating = await productsModel.findByIdAndUpdate(id, updatedProduct, { new: true });

    res.status(200).json({ message: "Product Successfully Updated", data: updating });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    await productsModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
