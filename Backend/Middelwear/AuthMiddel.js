import jwt from "jsonwebtoken";
import User from "../Model/UserModel.js";
import asyncHandeler from "./async.js";
import { sectat } from "../Config/jwt.js";

const authentication = asyncHandeler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, sectat);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed (00010E)");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token. (00020E)");
  }
});

const authorized = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorized as an admin.(00030E)");
  }
};

export { authentication, authorized };
