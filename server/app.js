import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { connect } from "./src/db/db.js";
import router from "./src/routes/routes.js";
import bodyParser from "body-parser";

dotenv.config();

const server = express();

server.use(cors());
server.use(morgan("dev"));
server.use(bodyParser.json());
// server use json type of data
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(router);

connect();

export default server;
