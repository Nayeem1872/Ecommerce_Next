import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";


export default function OrdersPage(){
    const [orders,setOrders] = useState([]);
    useEffect(()=>{
        axios.get('/api/orders').then(res=>{
            setOrders(res.data)
        })
    },[])
    const handlePrint = () => {
        window.print(orders);
      };



    return(
        <Layout>

        <h1>Orders</h1>
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
            {orders.length >0 && orders.map(order=>(
                <tr>
                    <td>{(new Date(order.createdAt)).toLocaleString()}
            </td>
                    <td>
                        {order.name} <br />
                        
                         {order.email} <br />
                        {order.city} {order.postalCode}<br />
                        {order.address} <br />
                        {order.mobile}

                    </td>
                    <td>
                    {order.line_items.map(l=>(
                        <>
                        {l.price_data?.product_data.name} x
                        {l.quantity} <br />
                        </>
                    ))}




                    </td>



                </tr>
            ))}
            




        </tbody>





        </table>

        </Layout>
    )
}