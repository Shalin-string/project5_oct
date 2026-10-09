import React from "react";

const Menucard = ({ item, addToCart }) => {
    return (
        <div className="menu-card">

            <div className="menu-card-image">
                🍽️
            </div>

            <div className="menu-card-content">

                <h2>{item.name}</h2>

                <p>{item.description}</p>

                <div className="menu-card-bottom">

                    <span>₹{item.price}</span>

                    <button onClick={() => addToCart(item)}>
                        Add to Cart
                    </button>

                </div>

            </div>

        </div>
    );
};

export default Menucard;