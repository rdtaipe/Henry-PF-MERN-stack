import mercadopago from 'mercadopago';
import dotenv from 'dotenv';
dotenv.config();
const { MERCADOPAGO_KEY } = process.env;

mercadopago.configure({
  access_token: MERCADOPAGO_KEY,
});

const getPay = async (req, res) => {
  const prod = req.body;
  let preference = {
    items: [
      {
        id: prod._id,
        title: prod.name,
        currency_id: "ARS",
        picture_url: prod.image[0],
        description: prod.description,
        category_id: "art",
        quantity: 1,
        unit_price: prod.price,
      },
    ],
    back_urls: {
      success: "http://localhost:3000/home",
      failure: "",
      pending: "",
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
