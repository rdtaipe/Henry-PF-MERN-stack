import productModel from "../models/product.js";

export const getSales = async (req, res) => {
  const { month, year } = req.query;
  try {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const data = fakeData.filter((purchase) => {
      const purchaseDate = new Date(purchase.time);
      return purchaseDate >= startDate && purchaseDate <= endDate;
    });

    const formatData = data.map((el) => {
      const date = new Date(el.time);
      const sold = el.products.reduce((accumulator, product) => {
        return accumulator + product.price * product.quantity;
      }, 0);
      return {
        day: date.getDate(),
        sold,
      };
    });

    const resp = [];
    for (let i = 1; i <= endDate.getDate(); i++) {
      const dayData = formatData.find((item) => item.day === i);
      if (dayData) {
        resp.push(dayData);
      } else {
        resp.push({ day: i, sold: 0 });
      }
    }

    res.json(resp);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const getPurchases = async (req, res) => {
  const { month, year } = req.query;

  const data = await productModel.find({}, { stock: 1, price: 1 });

  const formatData = data.map((el) => {
    
    return {
      month: el._id.getTimestamp().getMonth() + 1,
      day: el._id.getTimestamp().getDate(),
      total: el.stock * el.price,
    };
  });

  res.json(formatData);
};

const fakeData = [
  {
    _id: "6167bdf83c3de3f3c8d92819",
    paymentId: "1234567890",
    userId: "user123",
    products: [
      {
        productId: "prod123",
        name: "Product Name",
        quantity: 2,
        price: 19.99,
      },
      {
        productId: "prod456",
        name: "Another Product",
        quantity: 1,
        price: 9.99,
      },
    ],
    addressId: "addr123",
    time: "2022-01-01T12:34:56.789Z",
    state: "Delivered",
  },
  {
    _id: "6167bdf83c3de3f3c8d92820",
    paymentId: "0987654321",
    userId: "user456",
    products: [
      {
        productId: "prod789",
        name: "Product Name",
        quantity: 1,
        price: 29.99,
      },
      {
        productId: "prod012",
        name: "Another Product",
        quantity: 3,
        price: 14.99,
      },
    ],
    addressId: "addr456",
    time: "2022-01-03T08:12:34.567Z",
    state: "Delivered",
  },
  {
    _id: "6167bdf83c3de3f3c8d92821",
    paymentId: "1357908642",
    userId: "user789",
    products: [
      {
        productId: "prod345",
        name: "Product Name",
        quantity: 1,
        price: 49.99,
      },
      {
        productId: "prod678",
        name: "Another Product",
        quantity: 2,
        price: 24.99,
      },
    ],
    addressId: "addr789",
    time: "2022-01-05T15:43:21.210Z",
    state: "Delivered",
  },
  {
    _id: "6167bdf83c3de3f3c8d92822",
    paymentId: "2468135790",
    userId: "user012",
    products: [
      {
        productId: "prod901",
        name: "Product Name",
        quantity: 3,
        price: 9.99,
      },
      {
        productId: "prod234",
        name: "Another Product",
        quantity: 1,
        price: 19.99,
      },
    ],
    addressId: "addr012",
    time: "2022-01-08T11:22:33.444Z",
    state: "Delivered",
  },
  {
    _id: "6167bdf83c3de3f3c8d92823",
    paymentId: "3692581470",
    userId: "user345",
    products: [
      {
        productId: "prod567",
        name: "Product Name",
        quantity: 2,
        price: 29.99,
      },
      {
        productId: "prod890",
        name: "Another Product",
        quantity: 1,
        price: 14.99,
      },
    ],
    addressId: "addr345",
    time: "2022-01-10T17:32:10.987Z",
    state: "Delivered",
  },
  {
    _id: "6167bdf83c3de3f3c8d92824",
    paymentId: "4829103765",
    userId: "user678",
    products: [
      {
        productId: "prod123",
        name: "Product Name",
        quantity: 1,
        price: 39.99,
      },
      {
        productId: "prod456",
        name: "Another Product",
        quantity: 2,
        price: 19.99,
      },
    ],
    addressId: "addr678",
    time: "2022-02-15T09:08:07.654Z",
    state: "Delivered",
  },
  {
    _id: "6167bdf83c3de3f3c8d92825",
    paymentId: "9753108642",
    userId: "user901",
    products: [
      {
        productId: "prod789",
        name: "Product Name",
        quantity: 2,
        price: 29.99,
      },
      {
        productId: "prod012",
        name: "Another Product",
        quantity: 1,
        price: 14.99,
      },
    ],
    addressId: "addr901",
    time: "2022-02-17T14:21:43.210Z",
    state: "Delivered",
  },
  {
    _id: "6167bdf83c3de3f3c8d92826",
    paymentId: "8642097531",
    userId: "user234",
    products: [
      {
        productId: "prod345",
        name: "Product Name",
        quantity: 1,
        price: 19.99,
      },
      {
        productId: "prod678",
        name: "Another Product",
        quantity: 3,
        price: 9.99,
      },
    ],
    addressId: "addr234",
    time: "2022-02-21T18:54:32.109Z",
    state: "Delivered",
  },
];
