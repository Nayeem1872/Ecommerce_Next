import { useState } from "react";
import axios from "axios";

import { useRouter } from "next/router";

export default function ProductForm({
  _id,
  title: existingTitile,
  price: existingPrice,
  description: existingDescription,
}) {
  const [title, setTitle] = useState(existingTitile || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [goToProduct, setGoToProducts] = useState(false);
  const router = useRouter();
  async function saveProduct(ev) {
    ev.preventDefault();
    const data = { title, description, price };
    if (_id) {
      //update
        await axios.put('/api/products',{...data,_id})



    } else {
      //create
      
          await axios.post("/api/products", data);
        }
        setGoToProducts(true);
  }
  if (goToProduct) {
    router.push("/Products");
  }

  return (
    <form onSubmit={saveProduct}>
      <label>Product Name</label>
      <input
        type="text"
        placeholder="product name"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <label>Price</label>
      <input
        type="number"
        placeholder="product name"
        value={price}
        onChange={(ev) => setPrice(ev.target.value)}
      />
      <label>Description</label>
      <textarea
        placeholder="description"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      ></textarea>
      <button className="btn-primary">Save</button>
    </form>
  );
}
