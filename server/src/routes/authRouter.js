import jwt from "jsonwebtoken";
import { Router } from "express";
import passport from "passport";
import userModel from "../models/user.js";
const router = Router();

router.post(
  "/register",
  passport.authenticate("local-register", { session: false }),
  (req, res) => {
    const token = jwt.sign(
      { isAdmin: req.user.admin, email: req.user.email },
      process.env.JWT_KEY
    );
    const formatedToken = token.replace(/\./g, "_");
    res.redirect(`${process.env.FRONT_URL}/token/${formatedToken}`);
  }
);

router.post(
  "/login",
  passport.authenticate("local-login", { session: false }),
  (req, res) => {
    const token = jwt.sign(
      { isAdmin: req.user.admin, email: req.user.email },
      process.env.JWT_KEY
    );
    const formatedToken = token.replace(/\./g, "_");
    res.redirect(`${process.env.FRONT_URL}/token/${formatedToken}`);
  }
);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONT_URL}`,
  }),
  (req, res) => {
    const token = jwt.sign(
      { isAdmin: req.user[0].isAdmin, email: req.user[0].email },
      process.env.JWT_KEY
    );
    console.log(token); 

    const formatedToken = token.replace(/\./g, "_");
    res.redirect(`${process.env.FRONT_URL}/token/${formatedToken}`);
  }
);

router.get("/token/:token", async (req, res) => {
  const { token } = req.params;
  try {
    console.log(token);
    const payload = jwt.verify(token, process.env.JWT_KEY);
    console.log(payload);
    const user = await userModel.find({ email: payload.email });
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

export default router;
