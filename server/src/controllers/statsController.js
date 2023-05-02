import productModel from "../models/product.js";
import purchaseModel from "../models/purchase.js";
import userModel from "../models/user.js";

function sumByDay(purchases) {
  const result = [];
  purchases.forEach(purchase => {
    const existing = result.find(p => p.day === purchase.day);
    if (existing) {
      existing.purchase += purchase.purchase;
    } else {
      result.push({ day: purchase.day, purchase: purchase.purchase });
    }
  });
  return result;
}

/*  */ /*  */ /*  */
export const getSales = async (req, res) => {
  const { month, year } = req.query;
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23);

  try {
    const data = await purchaseModel.find({
      createdAt: { $gte: startDate, $lt: endDate },
    });

    const formatData = data.map((el) => {
      const total = el.products.reduce((accumulator, product) => {
        return accumulator + product.price * product.total;
      }, 0);
      return {
        total,
        day: new Date(el.createdAt).getDate(),
      };
    });

    const addDays = [];
    for (let i = 1; i <= endDate.getDate(); i++) {
      const dayData = formatData.find((item) => item.day === i);
      if (dayData) {
        addDays.push(dayData);
      } else {
        addDays.push({ day: i, total: 0 });
      }
    }

    const salesByDay = {};
    for (const { day, total } of addDays) {
      if (salesByDay[day]) {
        salesByDay[day] += total;
      } else {
        salesByDay[day] = total;
      }
    }

    res.json(salesByDay);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

/*  */ /*  */ /*  */
export const getPurchases = async (req, res) => {
  const { month, year } = req.query;
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  try {
    const data = await productModel.find(
      { createdAt: { $gte: startDate, $lt: endDate } },
      { stock: 1, price: 1, createdAt: 1 }
    );

    const formatData = data.map((el) => {
      const day = new Date(el.createdAt).getDate();
      const purchase = el.stock * el.price;
      return {
        day,
        purchase,
      };
    });

    const addDays = [];
    for (let i = 1; i <= endDate.getDate(); i++) {
      const dayData = sumByDay(formatData).find((item) => item.day === i);
      if (dayData) {
        addDays.push(dayData);
      } else {
        addDays.push({ day: i, purchase: 0 });
      }
    }

    const purchasesByDay = {};
    for (const { day, purchase } of addDays) {
      if (purchasesByDay[day]) {
        purchasesByDay[day] += purchase;
      } else {
        purchasesByDay[day] = purchase;
      }
    }

    res.json(purchasesByDay);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

/*  */ /*  */ /*  */
export const getUsersGenres = async (req, res) => {
  const {} = req.body;

  const data = await userModel.find();
  const males = await userModel.find({ genre: "male" });
  const females = await userModel.find({ genre: "female" });

  const resp = {
    total: data.length,
    males: males.length,
    females: females.length,
    undefined: data.length - (males.length + females.length),
  };

  res.json(resp);
};

/*  */ /*  */ /*  */
export const getProductsBestValued = async (req, res) => {
  try {
    const data = await productModel.find();
    const resp = data.sort((a, b) => b.stars - a.stars);
    res.json(resp);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

/*  */ /*  */ /*  */
export const getProductsGenres = async (req, res) => {
  try {
    const male = await productModel.find({ genre: "male" });
    const female = await productModel.find({ genre: "female" });
    const unisex = await productModel.find({ genre: "unisex" });

    const resp = {
      male: male.length,
      female: female.length,
      unisex: unisex.length,
    };

    res.json(resp);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
