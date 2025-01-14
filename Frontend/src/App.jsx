import React from "react";
import { Outlet } from "react-router-dom";
import Navegation from "./Pages/Auth/Navegation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <>
      <ToastContainer />
      <Navegation />
      <main className="py-3">
        <Outlet />
      </main>
    </>
  );
};

export default App;
