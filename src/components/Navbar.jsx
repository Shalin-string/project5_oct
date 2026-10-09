import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {

    const navigate = useNavigate();

    const role = localStorage.getItem("role");

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("cart");

        navigate("/login");
    };

    return (
        <nav className="navbar">

            <div className="navbar-logo">
                <Link to="/user/menu">
                    Hotel
                </Link>
            </div>

            <div className="navbar-links">

                {role?.toLowerCase() === "user" && (
                    <>
                        <Link to="/user/menu">
                            Menu
                        </Link>

                        <Link to="/user/cart">
                            Cart
                        </Link>

                        <Link to="/user/orders">
                            Orders
                        </Link>
                    </>
                )}

                {role?.toLowerCase() === "admin" && (
                    <>
                        <Link to="/admin">
                            Dashboard
                        </Link>

                        <Link to="/admin/menu">
                            Menu
                        </Link>

                        <Link to="/admin/orders">
                            Orders
                        </Link>
                    </>
                )}

                {role && (
                    <button
                        className="logout-btn"
                        onClick={logout}
                    >
                        Logout
                    </button>
                )}

            </div>

        </nav>
    );
};

export default Navbar;