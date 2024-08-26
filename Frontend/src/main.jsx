import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import Login from "./Pages/Auth/Login.jsx";
import Register from "./Pages/Auth/Register.jsx";
import { Provider } from "react-redux";
import store from "./Redux/store.js";
import PrivateRoute from "./Component/PrivateRoute.jsx";
import Profile from "./Pages/User/Profile.jsx";
import AdminRoutes from "./Pages/Admin/AdminRoutes.jsx";
import UserLint from "./Pages/Admin/UserLint.jsx";
import CategoryList from "./Pages/Admin/CategoryList.jsx";
import ProductList from "./Pages/Admin/ProductList.jsx";
import ProductUpdate from "./Pages/Admin/ProductUpdate.jsx";
import AllProducts from "./Pages/Admin/AllProducts.jsx";
import Favorites from "./Pages/Product/Favorites.jsx";
import Home from "./Pages/Home.jsx";
import ProductDetalies from "./Pages/Product/ProductDetalies.jsx";
import Cart from "./Pages/Cart.jsx";
import Shop from "./Pages/Shop.jsx";
import Shipping from "./Pages/Order/Shipping.jsx";
import PlaceOrders from "./Pages/Order/PlaceOrders.jsx";
import Order from "./Pages/Order/Order.jsx";
import AdminDashboard from "./Pages/Admin/AdminDashboard.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/placeorder" element={<PlaceOrders />} />
        <Route path="/order/:id" element={<Order />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route index={true} path="/" element={<Home />} />
      <Route path="/favorite" element={<Favorites />} />
      <Route path="/product/:id" element={<ProductDetalies />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/shop" element={<Shop />} />

      <Route path="/admin" element={<AdminRoutes />}>
        <Route path="userlist" element={<UserLint />} />
        <Route path="categorylist" element={<CategoryList />} />
        <Route path="productlist" element={<ProductList />} />
        <Route path="allproductList" element={<AllProducts />} />
        <Route path="product/update/:_id" element={<ProductUpdate />} />
        <Route path="dashboard" element={<AdminDashboard />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
