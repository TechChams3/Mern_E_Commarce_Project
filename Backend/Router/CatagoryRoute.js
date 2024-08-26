import express from "express";
import { authentication, authorized } from "../Middelwear/AuthMiddel.js";
import {
  createCategory,
  updateCategory,
  deleatecategory,
  listCategory,
  readCategory,
} from "../Controllers/CategoryControlers.js";

const router = express.Router();

router.route("/").post(createCategory);
router.route("/:categoryId").put(authentication, authorized, updateCategory);
router.route("/:categoryId").delete(deleatecategory);
router.route("/categories").get(listCategory);
router.route("/:id").get(readCategory);
export default router;
