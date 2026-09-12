import React, { useState, useEffect, useRef } from "react";
import { userAuth } from "./AuthContext";
import { useNotifications } from "./NotificationContext";


interface PaymentOption {
  name: string;
  logo: string;
  [key: string]: any;
}


export default function Checkout (cartId: number, paymentTotal: number) {
  
  /* keep an eye on edge cases */
  const user = userAuth();

  const [selectedOption, setSelectedOption] = useState<PaymentOption | null>(null);
  const [paymentOptions, setPaymentOptions] = useState<PaymentOption[]>([]);
  const [checkoutStatus, setCheckoutStatus] = useState<boolean>(false);
  const [paymentSubmitted, setPaymentSubmitted] = useState<boolean>(false);

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
      }
    }, [cartId, paymentTotal]);

    // handle idempotency
    const idempotencyKey = useNotifications()?.getIdempotencyKey();
    
    const handleCheckout = async () => {

      try {
        if (!selectedOption) {
          alert("Please select a payment option.");
          throw new Error("No payment option selected.");
        }
        if (!idempotencyKey) {
          throw new Error("Idempotency key is missing.");
        }
        const response = await fetch(`http://localhost:8000/playground/checkout/${selectedOption}/`, {
        method: 'POST',
        body: JSON.stringify({
          'cartId': cartId,
          'paymentTotal': paymentTotal,
          'idempotencyKey': idempotencyKey,
        })
      });
      response.ok ? setCheckoutStatus(true) : setCheckoutStatus(false);
    }
    catch (error) {
      console.error("Error during checkout:", error);
    }
    }

    return (
      <div className="checkout-container">
        <h2>Checkout</h2>
        <p>Cart ID: {cartId}</p>
        {checkoutStatus ? (
          <p>Checkout successful!</p>
        ) : (
          <div className="selected-option-details">
            <h3>{selectedOption?.name} Details</h3>
            <img src={`/images/${selectedOption?.logo}`} alt={`${selectedOption?.name} logo`} className="selected-option-logo" />
            <p>Payment Total: ${paymentTotal.toFixed(2)}</p>
            <button className="confirm-payment-button" disabled={!selectedOption || paymentTotal <= 0 || !idempotencyKey || paymentSubmitted || checkoutStatus} onClick={() => {handleCheckout(), setPaymentSubmitted(true)}}>
              Confirm Payment
            </button>
          </div>)
        
        }
      </div>
    )
}
