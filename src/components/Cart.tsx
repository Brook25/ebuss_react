import { React, useState, useEffect } from "react";
import userAuth from "./AuthContext";
import { Products } from "./Products";


function Cart () {
  const user = userAuth();
  const [cartItems, setCartItems] = useState<Array<Object>>([]);
    useEffect(() => {
      (async () => {
        try {
            const response = await fetch(`http://localhost:8000/playground/cart-items/`);
            const data = await response.json();
            setCartItems(data);
        } catch (error) {
            console.error("Error fetching cart items:", error);
        }
      });
    }, []);

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            <div className="cart-items">
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => )
              )}
            </div>
        </div>
    )
}
