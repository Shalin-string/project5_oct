import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";

import Menu from "../pages/user/Menu";
import Cart from "../pages/user/Cart";
import Orders from "../pages/user/Orders";

// import Dashboard from "../pages/admin/Dashboard";

import Navbar from "../components/Navbar";

const AppRoutes = () => {
    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route
                    path="/"
                    element={<Navigate to="/register" />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* USER */}
                <Route
                    path="/user/menu"
                    element={<Menu />}
                />

                <Route
                    path="/user/cart"
                    element={<Cart />}
                />

                <Route
                    path="/user/orders"
                    element={<Orders />}
                />

               

            </Routes>

        </BrowserRouter>
    );
};

export default AppRoutes;