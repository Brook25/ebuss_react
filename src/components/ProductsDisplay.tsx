import React from 'react';
import { useState } from 'react';

interface Product {
  id: number;
  imageUrl: string;
  name: string;
  description: string;
}

interface ProductsDisplayProps {
  products: Product[];
  nextUrl: string | null;
  onLoadMore: () => void;
}


function ProductDisplay(productData: Product) => {

  const [showSuccessBox, setShowSuccessBox] = useState<boolean>(false);
  const [successStatus, setSuccessStatus] = useState<boolean>(false);
  const handleAddToCart = () => {
    try {
      const response = await fetch(`http://localhost:8000/playground/add-to-cart/${productData.cartId}`, {
        method: 'POST',
        headers: {},
        body: JSON.stringify({ productId: productData.id }),
      });
      if (response.ok) {
        setShowSuccessBox(true);
        setSuccessStatus(true);
      }
      else {        
        setShowSuccessBox(true);
        setSuccessStatus(false);
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    <div className="product-card" key={productData.id}>
      <img src={productData.imageUrl} alt={productData.name} />
      <h2>{productData.name}</h2>
      <p>{productData.description}</p>
      <p>${productData.price.toFixed(2)}</p>
      <p>{productData.supplier}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
      {showSuccessBox && (
        <div className="success-box">
          {successStatus ? (<p>Product added to cart successfully!</p>
                            <span className="checkmark"></span>)
           : (<p>Failed to add product to cart.</p>
              <span className="crossmark"></span>)
           }
        </div>
      )}
    </div>
  );
}