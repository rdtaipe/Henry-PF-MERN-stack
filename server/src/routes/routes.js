import express from "express";
import products from "./productsRouter.js";
import address from './addressRouter.js'
import brands from './brandsRouter.js'
import category from './categoryRouter.js'
import colors from './colorsRouter.js'
import reviews from './reviewsRouter.js'
import cart from './cartRouter.js'
import comments from './commentsRouter.js'
import favorites from './favoritesRouter.js'
import purchase from './purchaseRouter.js'
import users from './userRouter.js'
import find from "./findRouter.js";
import dev from "./devRouter.js";
import mercadopago from './MercadoPagoRoute.js';
import email from './emailRouter.js'
const server = express();
//---- Products routes ------
server.use('/products', products);
/************************************************/
/************************************************/
//---- Address routes ------
server.use('/address', address)
//---- Purchase routes ------
server.use('/purchase', purchase)

//---- MercadoPago routes ------
server.use('/payment', mercadopago)

//---- Categories routes ------
server.use('/category', category)

//---- Brands routes ------
server.use('/brand', brands)

//---- Colors routes ------
server.use('/colors', colors)

//-------- Cart routes -----------
server.use('/cart', cart)

//---- Users routes ------
server.use('/users', users)

//------ Comments routes ---------
server.use('/comments', comments)

//-------- Favorites routes ----------
server.use('/favorites', favorites)

//-------- Reviews routes ----------
server.use('/reviews', reviews)
//---------Email routes-------------
server.use('/email', email)
//-------- Filters routes ----------
server.use('/find?', find);
//-------- dev utils routes ----------
server.use('/dev',dev)

export default server;