import React, { useEffect, useState } from 'react';

/* check typing of array of objects or empty array */

function Products() {
    
    const [productData, setProducts] = useState<{products: Array<Object | []>, nextUrl: String | null}>(
        { products: [], nextUrl: null }
    );
    
    const populateProducts = async () => {
        
        try {
            let response;
            
            if (productData.length === 0) 
                response = await fetch('http://127.0.0.1:8000/playground/products/0/');
            else
                response = await fetch(productData.nextUrl);

            const data = await response.json();

            setProducts([...productData.products, data.productData]);
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <div className=productData>

        </div>
    );
    
}






return (
    <div >
      
    </div>
)