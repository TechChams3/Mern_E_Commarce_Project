import express from "express";
import formidable from "express-formidable";
import { authorized, authentication } from "../Middelwear/AuthMiddel.js";
import checkId from "../Middelwear/CheackId.js";
import {
  addProduct,
  updateProductDetailes,
  removeProduct,
  fetchProduct,
  fetchProductById,
  fetchAllProduct,
  addProductReview,
  fetcTopProduct,
  fetchNewProduct,
  filterProducts,
} from "../Controllers/ProductControler.js";

const router = express.Router();

router.route("/").post(formidable(), addProduct).get(fetchProduct);
router.route("/allproduct").get(fetchAllProduct);
router.route("/:id/reviews").post(checkId, addProductReview);

router.get("/top", fetcTopProduct);
router.get("/new", fetchNewProduct);
router
  .route("/:id")
  .get(fetchProductById)
  .put(formidable(), updateProductDetailes)
  .delete(removeProduct);
router.route("/filtered-products").post(filterProducts);
export default router;
