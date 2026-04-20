import React, { useEffect, useState } from 'react';

const uriType = Interface {
    'resource': string,
    'identifier': string | null,
}


/* check typing of array of objects or empty array */

function Products() {
    
    const [productData, setProducts] = useState<{products: Array<Object | []>, nextUrl: String | null}>(
        { products: [], nextUrl: null }
    );
    
    const {resource, identifier: null} = useParams();

    
    useEffect(() => {
        
        (async () => {
            try {          
            let cancelled = false;
            const response = await fetch('http://127.0.0.1:8000/playground/products/0/');
            const data = await response.json();
            if (cancelled) return;
            setProducts({
              products: Array.isArray(data.productData) ?? [],
              nextUrl: data.nextUrl ?? null
            });
        }
        catch (error) {
          console.log(error);
        }
        return () => {
          cancelled = true;
        }
        });
    }, []);


    const fetchProducts = async () => {
      const newProducts = await fetch(productData.nextUrl);
      const data = await newProducts.json();
      setProducts((prev) => ({
        products: [...prev.products, ...data.products],
        nextUrl: data.nextUrl ?? null
      }));
    }

    return (
        <div className="productData">
          {productData.products.map((product) => (
            <div className="product" key={product.id}>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <img src={product.imageUrl} alt={product.name}/>
            </div>
          ))}
          {productData.nextUrl && (
            <button onClick={fetchProducts}>Load More</button>
          )}
        </div>
    );
    
}

