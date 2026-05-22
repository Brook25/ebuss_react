import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { ProductEndPoints, resolveEndpoint } from '../api/ProductEndPoints';
import ProductDisplay from './ProductsDisplay';

interface UriType {
  resource: string;
  identifier: string | null;
}

interface Product {
  id: number;
  imageUrl: string;
  name: string;
  description: string;
}

function ProductsDisplay() {
  const [productData, setProducts] = useState<{
    products: Product[];
    nextUrl: string | null;
  }>({
    products: [],
    nextUrl: null,
  });

  const { resource, identifier } = useParams<UriType>();
  const [searchParams] = useSearchParams<UriType>();

  useEffect(() => {
    (async () => {
      let cancelled = false;
      try {
        const q = searchParams.get('q');
        if (cancelled) return;
        const endpoint = resolveEndpoint(resource, identifier, q);
        if (endpoint != null) {
          const requestInfo: URL = new URL(endpoint);
          const response = await fetch(requestInfo);    
          const data = await response.json();
          setProducts({
          products: Array.isArray(data.productData) ? data.productData : [],
          nextUrl: data.nextUrl ?? null,
        });
        } else {
          console.log('Invalid resource or identifier');
        } 
      } catch (error) {
        console.log(error);
      }
      })();
    return () => { cancelled = true; };
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
    <div className="productData">
      {products.map((product) => (
        <div className="product" key={product.id}>
          <img src={product.imageUrl} alt={product.name} />
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <button>Add To cart</button>
        </div>
      ))}
      {nextUrl && (
        <button onClick={onLoadMore}>Load More</button>
      )}
    </div>
  );
}

export default ProductsDisplay;


