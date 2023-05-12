import { useState } from "react";
import axios from "axios";

import { useRouter } from "next/router";

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
  const [images, setImages] = useState(existingImages && existingImages.filter(image => image !== null && image !== undefined) || []);

  const [goToProduct, setGoToProducts] = useState(false);
  const router = useRouter();
  async function saveProduct(ev) {
    ev.preventDefault();
    const data = { title, description, price, images: images.filter((image) => image !== null && image !== undefined).map((image) => image.url), };
    if (_id) {
      //update
        await axios.put('/api/products',{...data,_id})



    } else {
      //create
      
          await axios.post('/api/products', data);
        }
        setGoToProducts(true);
  }
  if (goToProduct) {
    router.push("/Products");
  }

async function uploadImage(ev){
   const files = ev.target?.files;
   if(files?.length > 0){
    const data = new FormData()
    for (const file of files){
        data.append('file',file);
    }
    
    const res = await axios.post ('/api/upload',data);
    setImages(oldImages=>{
      return [...oldImages, ...res.data.links]
    });
    
   } 


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
      <label>Photos</label>
      <div className="mb-2 flex flex-wrap gap-2">

      {images?.length && images.map((image) => (
  image?.url && (
    <div key={image._id} className="h-24">
      <img src={image.url} alt="" className="rounded-lg" />
    </div>
  )
))}

        <label className=" w-24 h-24 border text-center flex flex-col rounded-lg bg-blue-200 items-center justify-center cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
</svg>
Upload
<input type="file" onChange={uploadImage} className="hidden" />
</label>
      </div>
      {!images?.length && (
        <div>No Photos found</div>
      )}
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
