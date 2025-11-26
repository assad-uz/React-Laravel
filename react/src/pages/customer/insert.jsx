import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = "http://127.0.0.1:8000/api"; 

const Insert = () => {
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
            await axios.post(`${API_BASE_URL}/customers`, customerField);
            
            navigate('/'); 
            alert("Customer added successfully!");

        } catch (err) {
            console.error("Error creating customer:", err.response ? err.response.data : err);
            alert("Failed to add customer. Check console for details.");
        }
    }
    
    return (
        <div className="container mt-4">
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <h3>Add Customer</h3>
                    <form onSubmit={onSubmitChange}>
                        <div className="mb-3">
                            <label className="form-label">Customer Name:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="name" 
                                onChange={changeUserFieldHandler}
                                value={customerField.name}
                                required 
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email:</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                name="email" 
                                onChange={changeUserFieldHandler} 
                                value={customerField.email}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Address:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="address" 
                                onChange={changeUserFieldHandler} 
                                value={customerField.address}
                                required
                            />
                        </div>
                        
                        <button type="submit" className="btn btn-primary">Add Customer</button>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default Insert;