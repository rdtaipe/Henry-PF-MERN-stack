import productModel from "../models/product.js";
import purchaseModel from "../models/purchase.js";
import userModel from "../models/user.js";

/*  */ /*  */ /*  */
export const getSales = async (req, res) => {
  const { month, year } = req.query;
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

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
      { stock: 1, cost: 1, createdAt: 1 }
    );

    const formatData = data.map((el) => {
      const day = new Date(el.createdAt).getDate();
      const purchase = el.stock * el.cost;
      return {
        day,
        purchase,
      };
    });

    const addDays = [];
    for (let i = 1; i <= endDate.getDate(); i++) {
      const dayData = formatData.find((item) => item.day === i);
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
export const getUsersLog = async (req, res) => {
  const {} = req.body;

  const data = await userModel.find()

  res.json(data)
};


/*  */  /*  */  /*  */
export const getProductsBestValued =  async (req,res) => {

  const data = await productModel.find()

  const resp = data.map(el => el.stars)
  res.json(resp)
}