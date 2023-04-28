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


    let preference = {
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

        console.log(response.body.init_point)


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
export async function success(req,res){
  const {id} = req.params

  try{
    const findCard = await cartModel.findOne({id})

    if(findCard){
      var newProducts =await findCard.products.forEach(async (prod) => {
        const findProduct = await ProductModel.findOne({id:prod.id})
        if(findProduct){
          findProduct.stock -= prod.total
          await findProduct.save()
        }
        if(prod.active){
          return prod
        }
      })
      if(newProducts){
        await cartModel.findOneAndUpdate({id},{$set:{products:newProducts}})
        await PurchaseModel.create({id,products:newProducts})
        
      }
      //get client url 
    console.log(req)


      res.redirect('http://localhost:3000/payment/success')
    }



  }catch(error){
    res.status(500).send({ error: error.message });

  }

}

export async function failure(req,res){
  const {id} = req.params

  res.redirect('http://localhost:3000/payment/failure')

  
}
export async function pending(req,res){
  const {id} = req.params

  res.redirect('http://localhost:3000/payment/pending')

}

