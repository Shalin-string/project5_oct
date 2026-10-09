import { useEffect, useState } from "react";
import "./Menu.css";

function Menu() {

    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);

    const getMenu = async () => {
        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://192.168.1.229:3001/api/menu",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            console.log("Menu response:", data);

            if (response.ok) {
                setMenu(data);
            } else {
                alert(data.message || "Failed to load menu");
            }

        } catch (error) {

            console.error("Menu error:", error);
            alert("Cannot connect to backend");

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMenu();
    }, []);

    const addToCart = (item) => {

        const cart = JSON.parse(
            localStorage.getItem("cart") || "[]"
        );

        const existingItem = cart.find(
            (cartItem) => cartItem._id === item._id
        );

        if (existingItem) {

            existingItem.quantity =
                (existingItem.quantity || 1) + 1;

        } else {

            cart.push({
                ...item,
                quantity: 1
            });

        }

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        alert(`${item.itemName} added to cart`);
    };

    if (loading) {
        return (
            <div className="menu-loading">
                Loading menu...
            </div>
        );
    }

    return (
        <div className="menu-page">

            <h1 className="menu-title">
                Our Menu
            </h1>

            {menu.length === 0 ? (

                <p className="no-menu">
                    No menu items available.
                </p>

            ) : (

                <div className="menu-container">

                    {menu.map((item) => (

                        <div
                            className="menu-card"
                            key={item._id}
                        >

                            <div className="menu-image">
                                🍽️
                            </div>

                            <div className="menu-content">

                                <h2 className="menu-name">
                                    {item.itemName}
                                </h2>

                                <span className="menu-category">
                                    {item.category}
                                </span>

                                <p className="menu-price">
                                    ₹{item.price}
                                </p>

                                <p className="menu-availability">

                                    Status:

                                    <span
                                        className={
                                            item.isAvailable
                                                ? "available"
                                                : "unavailable"
                                        }
                                    >
                                        {item.isAvailable
                                            ? " Available"
                                            : " Not Available"}
                                    </span>

                                </p>

                                <button
                                    className="menu-button"
                                    onClick={() =>
                                        addToCart(item)
                                    }
                                    disabled={!item.isAvailable}
                                >
                                    {item.isAvailable
                                        ? "Add to Cart"
                                        : "Unavailable"}
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default Menu;