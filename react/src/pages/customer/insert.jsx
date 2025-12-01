import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../axios';


function Insert() {
    const navigate = useNavigate();
    const [customerField, setCustomerField] = useState({
        name: "",
        email: "",
        address: ""
    });

    const changeUserFieldHandler = (e) => {
        setCustomerField({
            ...customerField,
            [e.target.name]: e.target.value
        });
    }

    const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/customers', customerField);
            
            alert("Customer added successfully!");
            navigate("/"); // সফল হলে লিস্ট পেজে ফিরে যাওয়া
        } catch (err) {
            console.error("Error adding customer:", err);
        }
    }

    // ব্যাক বাটনের জন্য
    const clickToBackHandler = () => {
        navigate("/");
    }

    return (
        <div className="container mt-4">
            <div className='col-md-6 offset-md-3'>
                <h1>Add New Customer</h1>
                <form onSubmit={onSubmitChange}>
                    <div className="mb-3">
                        <label className="form-label">Name:</label>
                        <input type="text" className="form-control" name="name" onChange={changeUserFieldHandler} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <input type="email" className="form-control" name="email" onChange={changeUserFieldHandler} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Address:</label>
                        <input type="text" className="form-control" name="address" onChange={changeUserFieldHandler} required />
                    </div>
                    <button type="submit" className="btn btn-primary me-2">Add Customer</button>
                    <button type="button" className='btn btn-secondary' onClick={clickToBackHandler}>Back To List</button>
                </form>
            </div>
        </div>
    )
}

export default Insert;