import React, { useState } from "react";
import "./Orders.css";

const Orders = () => {

    const [orders] = useState(
        JSON.parse(
            localStorage.getItem("orders")
        ) || []
    );

    return (
        <div className="orders-page">

            <h1>My Orders</h1>

            {orders.length === 0 ? (

                <div className="no-orders">

                    <h2>No orders yet</h2>

                    <p>
                        Place an order from the menu.
                    </p>

                </div>

            ) : (

                <div className="orders-container">

                    {orders.map((order) => (

                        <div
                            className="order-card"
                            key={order.id}
                        >

                            <div className="order-header">

                                <div>

                                    <h2>
                                        Order #{order.id}
                                    </h2>

                                    <small>
                                        {order.date}
                                    </small>

                                </div>

                                <span
                                    className={
                                        order.status ===
                                        "Completed"
                                            ? "status completed"
                                            : "status pending"
                                    }
                                >
                                    {order.status}
                                </span>

                            </div>

                            <div className="order-items">

                                {order.items.map((item) => (

                                    <div
                                        className="order-item"
                                        key={item.id}
                                    >

                                        <span>
                                            {item.name}
                                        </span>

                                        <span>
                                            {item.quantity} × ₹
                                            {item.price}
                                        </span>

                                        <strong>
                                            ₹
                                            {item.price *
                                                item.quantity}
                                        </strong>

                                    </div>

                                ))}

                            </div>

                            <div className="order-total">

                                <strong>
                                    Total: ₹{order.total}
                                </strong>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
};

export default Orders;