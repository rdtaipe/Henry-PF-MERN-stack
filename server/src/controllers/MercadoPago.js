import mercadopago from 'mercadopago';
import dotenv from 'dotenv';

import PurchaseModel from '../models/purchase.js';
import ProductModel from '../models/product.js';
import cartModel from '../models/cart.js';
import UserModel from '../models/user.js';


dotenv.config();
const { MERCADOPAGO_KEY } = process.env;

mercadopago.configure({
  access_token: MERCADOPAGO_KEY,
});

export default async function getPay(req, res) {
  const { userId, cart, total } = req.body
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
        customer_data: {
          email: "finetaype@gmail.com"
        },
        quantity: prod.quantity,
        unit_price: prod.price,
      };

      items.push(item);
    });


    let preference = {
      items: items,
      back_urls: {
        success: "http://localhost:3000/home",
        failure: "",
        pending: "",
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

        console.log(response.body.init_point)


        res.status(200).send({ response })

      })
      .catch((error) => res.status(400).send({ error: error.message }));
    const findUser = await UserModel.findById(userId)

    var customer_data = { "email": findUser.email }

    mercadopago.customers.create(customer_data).then((res) => {
      var newData = {
        token: "9b2d63e00d66a8c721607214cedaecda",
        id: res.body.id,
        first_name: findUser.name,
        payment_method_id: "debit_card",
        issuer_id: "303",
        payer: {
          email: findUser.email,
          identification: {
            type: "DNI",
            number: "9999999"
          }
        }
      }
      mercadopago.customers.cards.create(newData).then((res) => {
        console.log(res)
      })
    }
    ).catch(function (error) {
      console.log(error)
    })


  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};


