import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";





export default function OrdersPage() {
  const [cashOrders, setCashOrders] = useState([]);
  useEffect(() => {
    axios.get("/api/cashorders").then((res) => {
      setCashOrders(res.data);
    });
  }, []);
  const handlePrint = () => {
    window.print(cashOrders);
  };

  return (
    <Layout>
      <h1>Cash On  Delivery Orders</h1>
      <button className="bg-blue-800 rounded-md text-white py-1 px-2 mb-3" onClick={handlePrint}>Print</button>

      
<table className="basic">
  <thead>
    <tr>
      <th>Date</th>
      <th>Recipient</th>
      <th>Products</th>
    </tr>
  </thead>
  <tbody>
    {cashOrders.length > 0 &&
      cashOrders.map((order, index) => (
        <tr key={index} className={index % 2 === 0 ? 'even' : 'odd'}>
          <td>{new Date(order.createdAt).toLocaleString()}</td>
          <td>
            <div className="recipient-info">
              <div className="name">{order.name}</div>
              <div className="contact-info">
                <div>{order.email}</div>
                <div>
                  {order.city} {order.postalCode}
                </div>
                <div>{order.address}</div>
                <div>{order.mobile}</div>
              </div>
            </div>
          </td>
          <td>
            {order.line_items.map((item, itemIndex) => (
              <div key={itemIndex} className="product-info">
                <div className="name">{item.price_data?.product_data.name}</div>
                <div className="quantity">x{item.quantity}</div>
              </div>
            ))}
          </td>
        </tr>
      ))}
  </tbody>
</table>
    </Layout>
  );
}
