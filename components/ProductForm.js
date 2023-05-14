import { useState } from "react";
import axios from "axios";

import { useRouter } from "next/router";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({
  _id,
  title: existingTitle,
  price: existingPrice,
  description: existingDescription,
  images: existingImages,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [images,setImages] = useState(existingImages || []);
  const [isUploading, setIsUploading] = useState (false)

  const [goToProduct, setGoToProducts] = useState(false);
  const router = useRouter();
  async function saveProduct(ev) {
    ev.preventDefault();
    const data = {
      title,description,price,images
    };
    if (_id) {
      //update
      await axios.put('/api/products', {...data,_id});
    } else {
      //create
      await axios.post('/api/products', data);
    }
    setGoToProducts(true);
  }
  if (goToProduct) {
    router.push('/Products');
  }
  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append('file', file);
      }
      const res = await axios.post('/api/upload', data);
      
      setImages(oldImages => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
    }
  }
 
function updateImageOrder(imagess){
  console.log(imagess)
  setImages(imagess);
  
}

// console.log (setImages)

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
      <label>Photos</label>
      <div className="mb-1 flex flex-wrap gap-1">
  <ReactSortable
    list={images}
    className="flex flex-wrap gap-1"
    setList={updateImageOrder}
  >
    {!!images?.length && images.map(link => (
      <div key={link} className="h-24">
        <img src={link} alt="" className="rounded-lg" />
      </div>
    ))}
  </ReactSortable>
  {isUploading && (
    <div className="h-24 flex items-center">
      <Spinner />
    </div>
  )}
  <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
    </svg>
    <div>
      Add image
    </div>
    <input type="file" onChange={uploadImages} className="hidden" />
  </label>
</div>


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
