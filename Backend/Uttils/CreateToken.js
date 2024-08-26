import jwt from "jsonwebtoken";
import { sectat } from "../Config/jwt.js";
const genToken = (res, userId) => {
  const token = jwt.sign({ userId }, sectat, { expiresIn: "30d" });

  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  return token;
};

export default genToken;
