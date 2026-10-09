import { useEffect, useState } from "react";

function Menu() {

    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);

    const getMenu = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://192.168.1.229:3001/api/menu", // http://localhost:3001/api/menu
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

        cart.push(item);

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        alert(`${item.name} added to cart`);
    };

    if (loading) {
        return <h2>Loading menu...</h2>;
    }

    return (
        <div>

            <h1>Hotel Menu</h1>

            {menu.length === 0 ? (

                <p>No menu items available.</p>

            ) : (

                menu.map((item) => (

                    <div key={item._id}>

                        <h2>{item.name}</h2>

                        <p>{item.description}</p>

                        <p>Price: ₹{item.price}</p>

                        <button
                            onClick={() => addToCart(item)}
                        >
                            Add to Cart
                        </button>

                    </div>

                ))

            )}

        </div>
    );
}

export default Menu;
