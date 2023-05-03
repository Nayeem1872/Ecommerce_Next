import Layout from "@/components/Layout";
import { useState } from "react";
import axios from 'axios';

export default function NewProduct (){
    const [title, setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [price,setPrice] = useState('')
    async function createProduct (ev){
        ev.preventDefault();
        const data = {title,description,price}
        await axios.post('/api/products',data);

    }

return(

    <Layout>
        <form onSubmit={createProduct}>
        <h1 >New Products</h1>
        <label>Product Name</label>
        <input type="text" placeholder="product name" value={title} onChange={ev => setTitle(ev.target.value)} />
        <label>Price</label>
        <input type="number" placeholder="product name" value={price} onChange={ev => setPrice(ev.target.value)} />
        <label>Description</label>
        <textarea placeholder="description" value={description} onChange={ev => setDescription(ev.target.value)}></textarea>
        <button className="btn-primary">Save</button>
        </form>
    </Layout>

)

}