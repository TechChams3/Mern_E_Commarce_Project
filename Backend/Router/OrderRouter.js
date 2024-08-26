import express from "express";
import {
  createOrder,
  getAllOrders,
  getUserOrders,
  countTotalOrders,
  calculateTotalSales,
  calculateTotalSalesbydate,
  findOrderById,
  mardOrderAsPaid,
  markOrderAsDelivered,
} from "../Controllers/OrderControler.js";
import { authentication, authorized } from "../Middelwear/AuthMiddel.js";
const router = express.Router();

router.route("/").post(createOrder).get(getAllOrders);

router.route("/main").get(authentication, getUserOrders);

router.route("/total-orders").get(countTotalOrders);
router.route("/total-sales").get(calculateTotalSales);
router.route("/total-sales-by-date").get(calculateTotalSalesbydate);
router.route("/:id").get(findOrderById);
router.route("/:id/pay").put(mardOrderAsPaid);
router.route("/:id/deliver").put(markOrderAsDelivered);
export default router;
