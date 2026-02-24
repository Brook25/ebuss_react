import React, { useEffect, useState } from 'react';


function Orders() {

    const [orderData, setOrderData] = useState<{orders: Array, nextUrl: String | null}>(
        { orders: [], nextUrl: null }
    );

    const populateOrders = async () => {
        let response;
        
        try {
          if (!orderData.orders)
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


    useEffect(() => {
      populateOrders();
    }, []);


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
              <td><img> src={order.product.image}</img></td>
              <td>{order.id}</td>
              <td>{order.prdouct_name}</td>
              <td>{order.supplier_name}</td>
              <td>{order.date<}</td>
              <td>{order.status}</td>
            </tr>
          ))}
          <tr><td colspan="5"><button>Load More</button></td></tr>
        </tbody>
        </table>
      </div>
    )
  
  }

export default Orders;