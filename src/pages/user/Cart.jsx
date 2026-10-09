import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {

    const navigate = useNavigate();

    const [cart, setCart] = useState(
        JSON.parse(localStorage.getItem("cart")) || []
    );

    // Update cart
    const updateCart = (updatedCart) => {

        setCart(updatedCart);

        localStorage.setItem(
            "cart",
            JSON.stringify(updatedCart)
        );
    };

    // Increase quantity
    const increaseQuantity = (id) => {

        const updatedCart = cart.map((item) =>
            item._id === id
                ? {
                    ...item,
                    quantity: (item.quantity || 1) + 1
                }
                : item
        );

        updateCart(updatedCart);
    };

    // Decrease quantity
    const decreaseQuantity = (id) => {

        const updatedCart = cart
            .map((item) =>
                item._id === id
                    ? {
                        ...item,
                        quantity: (item.quantity || 1) - 1
                    }
                    : item
            )
            .filter((item) => item.quantity > 0);

        updateCart(updatedCart);
    };

    // Remove item
    const removeItem = (id) => {

        const updatedCart = cart.filter(
            (item) => item._id !== id
        );

        updateCart(updatedCart);
    };

    // Calculate total
    const total = cart.reduce(
        (sum, item) =>
            sum + item.price * (item.quantity || 1),
        0
    );

    // Place order
    const placeOrder = async () => {

        if (cart.length === 0) {
            alert("Your cart is empty");
            return;
        }

        try {

            const token = localStorage.getItem("token");

            // Data sent to backend
            const orderData = {
                items: cart.map((item) => ({
                    menuItem: item._id,
                    quantity: item.quantity || 1
                }))
            };

            console.log("Sending order:", orderData);

            const response = await fetch(
                "http://192.168.1.229:3001/api/orders",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },

                    body: JSON.stringify(orderData)
                }
            );

            const data = await response.json();

            console.log("Order response:", data);

            // Backend error
            if (!response.ok) {

                alert(
                    data.message ||
                    "Failed to place order"
                );

                return;
            }

            // Order successful
            alert(
                `Order placed successfully!\n\n` +
                `Order ID: ${data.orderId}\n` +
                `Total: ₹${data.totalPrice}`
            );

            // Clear cart
            localStorage.removeItem("cart");

            setCart([]);

            // Go to orders
            navigate("/user/orders");

        } catch (error) {

            console.error(
                "Order error:",
                error
            );

            alert(
                "Cannot connect to backend"
            );
        }
    };

    return (
        <div className="cart-page">

            <h1>Your Cart</h1>

            {cart.length === 0 ? (

                <div className="empty-cart">

                    <h2>
                        Your cart is empty
                    </h2>

                    <button
                        onClick={() =>
                            navigate("/user/menu")
                        }
                    >
                        Go To Menu
                    </button>

                </div>

            ) : (

                <>

                    <div className="cart-items">

                        {cart.map((item) => (

                            <div
                                className="cart-item"
                                key={item._id}
                            >

                                {/* Item information */}
                                <div className="item-info">

                                    <h2>
                                        {item.itemName}
                                    </h2>

                                    <p>
                                        Category:{" "}
                                        {item.category}
                                    </p>

                                    <p>
                                        ₹{item.price} each
                                    </p>

                                </div>


                                {/* Quantity */}
                                <div className="quantity">

                                    <button
                                        onClick={() =>
                                            decreaseQuantity(
                                                item._id
                                            )
                                        }
                                    >
                                        -
                                    </button>

                                    <span>
                                        {item.quantity || 1}
                                    </span>

                                    <button
                                        onClick={() =>
                                            increaseQuantity(
                                                item._id
                                            )
                                        }
                                    >
                                        +
                                    </button>

                                </div>


                                {/* Item total */}
                                <h3>
                                    ₹
                                    {item.price *
                                        (item.quantity || 1)}
                                </h3>


                                {/* Remove */}
                                <button
                                    className="remove-btn"
                                    onClick={() =>
                                        removeItem(
                                            item._id
                                        )
                                    }
                                >
                                    Remove
                                </button>

                            </div>

                        ))}

                    </div>


                    {/* Cart summary */}
                    <div className="cart-summary">

                        <h2>
                            Total: ₹{total}
                        </h2>

                        <button
                            className="order-btn"
                            onClick={placeOrder}
                        >
                            Place Order
                        </button>

                    </div>

                </>

            )}

        </div>
    );
};

export default Cart;