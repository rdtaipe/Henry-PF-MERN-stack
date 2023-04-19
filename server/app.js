import express from "express";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { connect } from "./src/db/db.js";
import router from "./src/routes/routes.js";
import bodyParser from "body-parser";
import passport from "passport";
import "./src/services/passport.config.js";

dotenv.config();
const server = express();

server.use(
  session({
    secret: "clave_secreta",
    resave: false,
    saveUninitialized: false,
  })
);

server.use(cors());
server.use(morgan("dev"));
server.use(bodyParser.json());
// server use json type of data
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(passport.initialize());
server.use(passport.session());
server.use(router);

connect();

export default server;
