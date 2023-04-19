import mercadopago from 'mercadopago';
import dotenv from 'dotenv';
dotenv.config();
const { MERCADOPAGO_KEY } = process.env;

mercadopago.configure({
  access_token: MERCADOPAGO_KEY,
});

const getPay = async (req, res) => {
  const products = req.body;

  let items = [];
 // _id, name, image, description, price
  products.forEach((prod) => {
    const item = {
      id: prod._id,
      title: prod.description,
      currency_id: "ARS",
      picture_url: prod.image[0],
      description: prod.description,
      category_id: "art",
      quantity: 1,
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
    .then((response) => res.status(200).send({ response }))
    .catch((error) => res.status(400).send({ error: error.message }));
};

export default getPay;
