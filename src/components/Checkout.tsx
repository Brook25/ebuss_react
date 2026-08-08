import React, { useState, useEffect, useRef } from "react";
import { userAuth } from "./AuthContext";



function Checkout (cartId: number, paymentTotal: number) {
  const user = userAuth();

  const [selectedOption, setSelectedOption] = useState<Object>({});
  const [paymentOptions, setPaymentOptions] = useState<[]>([]);
  const [checkoutStatus, setCheckoutStatus] = useState<boolean | null>(null);

    useEffect(() => {
      let isMounted = true;
      (async () => {
        try {
            const response = await fetch(`http://localhost:8000/playground/payment-options/`);
            if (!isMounted) return;
            const data = await response.json();
            setPaymentOptions(data);
        } catch (error) {
            console.error("Error fetching withdrawal options:", error);
        }
      });

      return () => {
        isMounted = false;
        // Cleanup if necessary
      }
    }, []);

    // handle idempotency
    const uuid = useRef<null | string>(null);
    
    const handleCheckout = () => {
      uuid.current = crypto.randomUUID();
      const response = await fetch(`http://localhost:8000/playground/checkout/${selectedOption}/`, {
        method: 'POST',
        body: JSON.stringify({
          'cartId': cartId,
          'paymentTotal': paymentTotal,
          'idempotencyKey': uuid.current,
        })
      });
      response.ok ? setCheckoutStatus(true) : setCheckoutStatus(false);

    }

    return (
      <div className="checkout-container">
        <h2>Checkout</h2>
        <p>Cart ID: {cartId}</p>
        {checkoutStatus ? (
          <p>Checkout successful!</p>
        ) : (
          <div className="selected-option-details">
            <h3>{option.name} Details</h3>
            <img src=`/images/${option}.png` alt={`${option} logo`} className="selected-option-logo" />
            <p>Payment Total: ${paymentTotal.toFixed(2)}</p>
            <button className="confirm-payment-button" onClick={handleCheckout}>
              Confirm Payment
            </button>
          </div>)
        
        }
      </div>
    )
}