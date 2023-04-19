import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { connect } from "./src/db/db.js";
import router from "./src/routes/routes.js";

import path from "path"
import expressSession from "express-session"
import passport from "passport"
import Auth0Strategy from "passport-auth0"

dotenv.config();

const session = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: false
  };

const server = express();

server.use(cors());
server.use(morgan("dev"));
// server use json type of data
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(router);

connect();

export default server;
