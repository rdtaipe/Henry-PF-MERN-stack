import express from "express";
import products from "./products.js";
import find from "./find.js";

const server = express();

server.use('/products', products);
server.use('/find?', find);

export default server;