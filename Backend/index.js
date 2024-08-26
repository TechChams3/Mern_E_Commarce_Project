import express from "express";
import dotenv from "dotenv";
import Mo_Database from "./Config/MO_Database.js";
import userRouters from "./Router/UserRouter.js";
import categoryRoutes from "./Router/CatagoryRoute.js";
import productRoutes from "./Router/ProductRoutes.js";
import uploadRoutes from "./Router/UploadRoutes.js";
import orderRouter from "./Router/OrderRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

dotenv.config();
const PORT = 5000;
const app = express();

app.get("/", (req, res) => {
  res.send("i am unher");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use("/api/auth", userRouters);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/order", orderRouter);
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

Mo_Database()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`app is listening in ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
