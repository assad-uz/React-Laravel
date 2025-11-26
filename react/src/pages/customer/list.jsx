import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = "http://127.0.0.1:8000/api"; 

function List() {
    const [customers, setCustomers] = useState([]);
    
    const fetchCustomers = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/customers`);
            setCustomers(res.data);
        } catch (err) {
            console.error("Error fetching customers:", err);
            setCustomers([]);
        }
    }

    const deleteCustomer = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/customers/${id}`);
            fetchCustomers();
            alert(`Customer ID ${id} deleted successfully!`);
        } catch (err) {
            console.error("Error deleting customer:", err);
        }
    }

    useEffect(() => {
        fetchCustomers();
    }, [])

    return (
        <div className="container mt-4">
            <h3>Customer Details</h3>
            <NavLink to="/insert" className="btn btn-success mb-3">Add New Customer</NavLink>
            
            {Array.isArray(customers) && customers.length === 0 && (
                <p>No customers found. Please add a new customer.</p>
            )}

            {Array.isArray(customers) && customers.length > 0 && (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>S No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            customers.map((customer, i) => {
                                return (
                                    <tr key={customer.id}>
                                        <td>{i + 1}</td>
                                        <td>{customer.name}</td>
                                        <td>{customer.email}</td>
                                        <td>{customer.address}</td>
                                        <td>
                                            <button 
                                                onClick={() => deleteCustomer(customer.id)}
                                                className="btn btn-danger btn-sm"
                                            >
                                                Delete
                                            </button>
                                            <NavLink to={`/edit/${customer.id}`} className="btn btn-info btn-sm mx-2">Edit</NavLink>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default List;