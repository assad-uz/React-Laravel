import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios'
function List() {
     const [products, setProducts] = useState([]);
       const updateProduct = async (id) => {
    try {
      await axios.put(`${"http://127.0.0.1:8000/api/customers/${id}"}/${id}`, form);
      setForm({ name: "", email: "", address: "" });
      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };
     // Delete data
const deleteProduct = async (id) => {
  await axios.delete(`http://127.0.0.1:8000/api/customers/${id}`);
  fetchProducts();
}
  // Fetch data
  const fetchProducts = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/customers");
     console.log(res.data);
    setProducts(res.data);
  }

  useEffect(() => {
    fetchProducts();
  }, [])

  return (
     <div className="container">
        <h3>Products Details</h3>
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>S No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                </tr>
            </thead>
            <tbody>
                {
                    products.map((p, i) => {
                        return (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{p.name} </td>
                                <td>{p.email} </td>
                                <td>
                                  <button onClick={() => deleteProduct(p.id)}>Delete</button>
                                
                                        <NavLink to={`/edit/${p.id}`} className="btn btn-info mx-2">Edit</NavLink>
                                </td>
                            </tr>
                        )
                    })
                }
 
            </tbody>
        </table>
        </div>
  )
}

export default List