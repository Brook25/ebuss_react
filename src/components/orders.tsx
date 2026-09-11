import React, { useEffect, useState } from 'react';

interface OrderType {
    id: number,
    product_name: string,
    product_image: string,
    supplier_name: string,
    date: string,
    status: string
}

function Orders() {

    const [orderData, setOrderData] = useState<{orders: OrderType[], nextUrl: URL | RequestInfo | string }>(
        { orders: [], nextUrl: 'http://127.0.0.1:8000/playground/orders/0/' }
    );

    const populateOrders = async () => {
        let response;
        
        try {
            response = await fetch(orderData.nextUrl);
            const orders = await response.json() as {data: OrderType[], nextUrl: URL | RequestInfo | string};

            setOrderData((prevState) => (
            {
              orders: [...prevState.orders, ...orders.data],
              nextUrl: orders.nextUrl
            }
          ));
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
          {orderData.orders.map((order) => (
            <tr key={order.id}>
              <td><img src={order.product_image} alt={order.product_name} /></td>
              <td>{order.id}</td>
              <td>{order.product_name}</td>
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