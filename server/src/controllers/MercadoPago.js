import mercadopago from 'mercadopago';
import dotenv from 'dotenv';

import PurchaseModel from '../models/purchase.js';
import ProductModel from '../models/product.js';
import CartModel from '../models/cart.js';
import UserModel from '../models/user.js';
import sendEmail from '../utils/mail/send.js'


dotenv.config();
const { MERCADOPAGO_KEY } = process.env;
mercadopago.configure({
  access_token: MERCADOPAGO_KEY,
});

export async function payment(req, res) {
  const { userId, cart, total } = req.body
  const url = `${req.protocol}://${req.get('host')}`

  try {

    let items = [];
    // _id, name, image, description, price
    cart.forEach((prod) => {
      const item = {
        id: prod.productId,
        title: prod.name,
        picture_url: prod.image,
        description: prod.description,
        category_id: "art",
        quantity: prod.quantity,
        unit_price: prod.price,
      };

      items.push(item);
    });


    var preference = {
      items: items,
      back_urls: {
        success: `${url}/payment/success/${userId}`,
        failure: `${url}/payment/failure/${userId}`,
        pending: `${url}/payment/pending/${userId}`,
      },
      payer: {
        items: items.map((item) => {
          return {
            title: item.title,
            description: item.description,
            quantity: item.quantity,
            unit_price: item.unit_price,
          };
        })
      },
      auto_return: "approved",
      binary_mode: true,
    };

    mercadopago.preferences
      .create(preference)
      .then((response) => {
        res.status(200).send({ response })

      })
      .catch((error) => res.status(400).send({ error: error.message }));


  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};
// success: 
// failure: 
// pending
export async function success(req, res) {
  const { id } = req.params; // ID del usuario

  try {
    const findCard = await CartModel.findOne({ id });

    if (findCard) {
      const findCardProducts = findCard.products.filter((prod) => prod.active); // Productos activos en el carrito

      if (findCardProducts.length > 0) {


        const findProduct = await ProductModel.find({ $or: findCardProducts.map((item) => ({ _id: item.id })) });

        // Compara y modifica
        const newProducts = findProduct.map((item, i) => {
          const obj = Object.keys(item._doc).reduce((acc, key) => {
            switch (key) {
              case "stock":
                acc[key] = item.stock - findCardProducts[i].total;
                break;
              default:
                acc[key] = item[key];
            }
            return acc;
          }, {});
          return obj;
        });

        if (newProducts) {

          // Actualiza los modelos de carrito y compra
          const updating = await Promise.all(newProducts.map(async (item, i) => {
            const productId = item._id.toString()

            // Elimina los productos antiguos del carrito
            await CartModel.findOneAndUpdate({ id: id }, { $pull: { products: { id: productId } } });

            // Crea un nuevo objeto de compra
            const newPurchaseModel = {
              productId: productId, // ID del producto
              name: item.name,
              image: item.image,
              price: item.price,
              description: item.description,
              brand: item.brand,
              stock: item.stock,
              color: item.color,
              date: Date.now(), // Fecha actual
              total: findCardProducts[i].total,
            };

            await ProductModel.findByIdAndUpdate({ _id: item._id }, { $set: { stock: item.stock } })
            // Verifica si ya existe un modelo de compra para el usuario
            const filter = { userId: id };


            const update = { $push: { products: newPurchaseModel } };
            const options = { upsert: true, new: true, setDefaultsOnInsert: true };
            const updatePurchase = await PurchaseModel.findOneAndUpdate(filter, update, options);
            return updatePurchase;
          }));


          if (updating) {


            const findUser = await UserModel.findById(id)
            const { origin } = findUser


            await sendEmail({ user: findUser, body: { type: "order", issue: "Thank you for purchase", data: findCardProducts } })//send welcome email

            res.redirect(`https://chiccloset-service.web.app/payment/success`)

          } else {
            res.status(403).json({ message: "Not found Updating" })
          }
        }
      }
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}



async function getActiveCart(userId) {
  return await CartModel.findOne({ id: userId })
}

async function getProducts(productList) {
  const productIds = productList.filter((product) => product.active).map((product) => product.id);
  return await ProductModel.find({ _id: { $in: productIds } });
}

async function updateProducts(products, cartProducts) {
  const updatedProducts = [];
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const cartProduct = cartProducts.find((p) => p.id === product._id.toString() && p.active);
    if (!cartProduct) {
      continue;
    }
    const updatedProduct = {
      ...product._doc,
      stock: product.stock - cartProduct.total,
    };
    updatedProducts.push(updatedProduct);
  }
  if (!updatedProducts.length) {
    return null;
  }
  return updatedProducts;
}

async function createOrUpdatePurchase(userId, products) {
  const purchase = await PurchaseModel.findOneAndUpdate({ userId },
    { $setOnInsert: { userId }, $push: { products } },
    { upsert: true, new: true }
  );
  return purchase;
}

async function getUser(userId) {
  return await UserModel.findById(userId);
}

async function sendPurchaseEmail(user, products) {
  await sendEmail({
    user,
    body: { type: 'order', issue: 'Thank you for your purchase', data: products },
  });
}



export async function failure(req, res) {
  const { id } = req.params
  const findUser = await UserModel.findById(id)
  const { origin } = findUser

  // await sendEmail({ user: findUser, body: { type: "orderFailure", issue: "Thank you for purchase",data:findCardProducts}})//send welcome email
  res.redirect(`https://chiccloset-service.web.app/payment/success`)


}
export async function pending(req, res) {
  const { id } = req.params
  const findUser = await UserModel.findById(id)
  const { origin } = findUser

  // await sendEmail({ user: findUser, body: { type: "orderPending", issue: "Thank you for purchase",data:findCardProducts}})//send welcome email
  res.redirect(`https://chiccloset-service.web.app/payment/success`)


}


