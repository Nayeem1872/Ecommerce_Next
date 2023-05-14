import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";


function Categories({swal}){
  const[editCat, setEditCat] = useState (null)
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [properties,setProperties] = useState([])

  useEffect(() => {
    fetchCat();
  }, []);

  function fetchCat() {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }

  async function saveCat(ev) {
    ev.preventDefault();
    const data = {name, parentCategory}
    if(editCat){
        data._id = editCat._id;
        await axios.put('/api/categories',data)
        setEditCat(null)

    }else{

        await axios.post("/api/categories", data);
    }

    
    setName("");
    fetchCat();
  }
  function editCategory (category){
    setEditCat(category)
    setName (category.name)
    setParentCategory(category.parent?._id)
  }
  function deleteCategory (category){
    swal.fire({
      title:'Are you sure???',
      text:`Do you want to delete ${category.name}?`,
      showCancelButton: true,
      cancelButtonText:'Cancel',
      confirmButtonText:'Yes,Delete!',
      reverseButton:true,
    }).then(async result =>{
      if(result.isConfirmed){
        const {_id}=category;
       await axios.delete('/api/categories?_id='+_id);
       fetchCat()
      }
    })
  }
  function addProperty(){
    setProperties(prev=>{
      return [...prev,{name:'', values:''}]
    })
  }
  function handlePropertyNameChange (index,property,newName){
    setProperties(prev=>{
      const properties = [...prev];
      properties[index].name = newName;
      return properties
    })

  }
  function handlePropertyvaluesChange (index,property,newvalues){
    setProperties(prev=>{
      const properties = [...prev];
      properties[index].values = newvalues;
      return properties
    })

  }
  function removeProperty (index){
    setProperties (prev=>{
      return [...prev].filter((p,pIndex)=>{
        return pIndex !== index;
      })
    })
  }


  return (
    <Layout>
      <h1>Categories</h1>
      <label>
  {editCat ? `Edit Category ${editCat.name}` : 'Add New Category'}
</label>
      <form onSubmit={saveCat} className="">

        <div className="flex gap-1">
        <input
          className=""
          type="text"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
          placeholder={"Category Name"}
        />
        <select
          className=""
          value={parentCategory}
          onChange={(ev) => setParentCategory(ev.target.value)}
        >
          <option value="0"> No Parent Category</option>
          {categories.length > 0 &&
            categories.map((category) => (
              <option value={category._id}>{category.name}</option>
            ))}
        </select>



        </div>
              <div className="mb-2">
                <label className="block mb-2">Properties</label>
                <button 
                
                onClick={addProperty}
                type="button" className="btn-default text-sm mb-3">
              Add New Properties
                </button>
              {properties.length >0 && properties.map((property,index)=>(
                <div className="flex gap-1 mb-2">
                  <input className="mb-0" type="text" value={property.name}
                  onChange={ev=>handlePropertyNameChange(index,property, ev.target.value)}
                  placeholder="Property name" />
                  <input className="mb-0" type="text" 
                  onChange={ev=>handlePropertyvaluesChange(index,property, ev.target.value)}
                  value={property.values} 
                  placeholder="Property value" />
                  <button
                  type="button"
                  onClick={()=>removeProperty(index)}
                  className="btn-default">
                    Remove
                  </button>


                </div>
              ))}


              </div>

        
        <button type="submit" className="btn-primary py-1">
          {" "}
          Save
        </button>
      </form>
      <table className="basic mt-12 ">
        <thead>
          <tr>
            <td>Category Name</td>
            <td>Parent Category</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category) => (
              <tr>
                <td>{category.name}</td>
                <td>{category?.parent?.name}</td>
                <td>
                  <button
                    onClick={() => editCategory(category)}
                    className="btn-primary mr-1"
                  >
                    {" "}
                    Edit
                  </button>
                  <button 
                  onClick={()=>deleteCategory(category)}
                  className="btn-primary"> Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );



}

export default withSwal (({swal},ref)=> (
   <Categories swal={swal} />
))
