import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Categories() {
    const[editCat, setEditCat] = useState (null)
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState([]);

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

  return (
    <Layout>
      <h1>Categories</h1>
      <label>
  {editCat ? `Edit Category ${editCat.name}` : 'Add New Category'}
</label>
      <form onSubmit={saveCat} className="flex gap-1">
        <input
          className="mb-0"
          type="text"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
          placeholder={"Category Name"}
        />
        <select
          className="mb-0"
          value={parentCategory}
          onChange={(ev) => setParentCategory(ev.target.value)}
        >
          <option value="0"> No Parent Category</option>
          {categories.length > 0 &&
            categories.map((category) => (
              <option value={category._id}>{category.name}</option>
            ))}
        </select>
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
                  <button className="btn-primary"> Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
