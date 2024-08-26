import express from "express";
import {
  creatUser,
  deleatUser,
  getAll,
  getCurrentPeofile,
  getUserById,
  loginuser,
  logoutuser,
  updateCurrentProfile,
  updateUserbyId,
} from "../Controllers/UserController.js";
import { authentication, authorized } from "../Middelwear/AuthMiddel.js";

const router = express.Router();

router.route("/").post(creatUser).get(getAll);

router.post("/login", loginuser);
router.post("/logout", logoutuser);

router
  .route("/profile")
  .get(authentication, getCurrentPeofile)
  .put(authentication, updateCurrentProfile);

//Admin Router
router
  .route("/:id")
  .delete(authentication, authorized, deleatUser)
  .get(authentication, authorized, getUserById)
  .put(authentication, authorized, updateUserbyId);

export default router;
