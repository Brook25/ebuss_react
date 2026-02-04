import React, { useEffect, useState } from 'react';


function orders() {

    const [orderData, setOrderData] = useState<{orders: Array | null}>(
        { orders: null, nextUrl: null }
    );

    populatePosts = () => {
        let response;
        
        try {
          if (!orders)
            response = await fetch('http://127.0.0.1:8000/playground/orders/0/');
          else
            response = await fetch(orderData.nextUrl);
        
          const orders = await response.json();

          setOrderData({orders: [orderData.orders, ...orders.data], nextUrl: orderData.nextUrl});
        }        
        catch(error) {
            console.log(error);
        }
      };

    let columns = ['Id', 'Product name', 'Supplier', 'Date', 'Status']

    return (
      <div className="orders">
        <table>
          <thead>
            <tr>{columns.map((column) => (
            <th>{column}</th>
          )
        )}</tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td><img> source={order.product.image}</img></td>
              <td>order.id</td>
              <td>order.prdouct_name</td>
              <td>order.supplier_name</td>
              <td>order.date</td>
              <td>order.status</td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    )
  
  }

export default orders;