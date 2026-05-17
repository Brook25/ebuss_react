import React, { useEffect, useState } from 'react';
import ProductsDisplay from './ProductsDisplay';

interface Product {
  id: number;
  imageUrl: string;
  name: string;
  description: string;
}

function UserProducts() {
  const [productData, setProducts] = useState<{
    products: Product[];
    nextUrl: string | null;
  }>({
    products: [],
    nextUrl: null,
  });

  useEffect(() => {
    (async () => {
      try {
        let cancelled = false;
        // Example: fetch user-specific products
        const response = await fetch('http://127.0.0.1:8000/playground/user-products/');
        const data = await response.json();
        if (cancelled) return;
        setProducts({
          products: Array.isArray(data.productData) ? data.productData : [],
          nextUrl: data.nextUrl ?? null,
        });
      } catch (error) {
        console.log(error);
      }
      return () => {
        cancelled = true;
      };
    })();
  }, []);

  const fetchProducts = async () => {
    if (!productData.nextUrl) return;
    try {
      const newProducts = await fetch(productData.nextUrl);
      const data = await newProducts.json();
      setProducts((prev) => ({
        products: [...prev.products, ...(data.products || [])],
        nextUrl: data.nextUrl ?? null,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProductsDisplay
      products={productData.products}
      nextUrl={productData.nextUrl}
      onLoadMore={fetchProducts}
    />
  );
}

export default UserProducts;