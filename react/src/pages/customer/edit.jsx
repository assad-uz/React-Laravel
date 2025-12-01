import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../axios'; // ✅ কাস্টম 'api' ইনস্ট্যান্স ইমপোর্ট করুন


function Edit() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [customerField, setCustomerField] = useState({
        name: "",
        email: "",
        address: ""
    });

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                // ✅ api ব্যবহার করে GET কল করা হলো
                const result = await api.get(`/api/customers/${id}`); 
                setCustomerField(result.data); 
            } catch (err) {
                console.error("Error fetching single customer:", err); 
                alert("Could not load customer data.");
            }
        }
        fetchCustomer();
    }, [id]) // ID পরিবর্তন হলে ডেটা রি-ফেচ হবে

    const changeUserFieldHandler = (e) => {
        setCustomerField({
            ...customerField,
            [e.target.name]: e.target.value
        });
    }

    const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
            // ✅ api ব্যবহার করে PUT কল করা হলো
            await api.put(`/api/customers/${id}`, customerField);
            
            alert("Customer updated successfully!");
            navigate("/");
        } catch (err) {
            console.error("Error updating customer:", err);
        }
    }

    // ব্যাক বাটনের জন্য
    const clickToBackHandler = () => {
        navigate("/");
    }

    return (
        <div className="container mt-4">
            <div className='col-md-6 offset-md-3'>
                <h1>Edit Customer (ID: {id})</h1>
                <form onSubmit={onSubmitChange}>
                    <div className="mb-3">
                        <label className="form-label">ID:</label>
                        <input type="text" className="form-control" name="id" value={id} disabled />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Name:</label>
                        <input type="text" className="form-control" name="name" value={customerField.name} onChange={changeUserFieldHandler} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <input type="email" className="form-control" name="email" value={customerField.email} onChange={changeUserFieldHandler} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Address:</label>
                        <input type="text" className="form-control" name="address" value={customerField.address} onChange={changeUserFieldHandler} required />
                    </div>
                    <button type="submit" className="btn btn-primary me-2">Update Customer</button>
                    <button type="button" className='btn btn-secondary' onClick={clickToBackHandler}>Back To List</button>
                </form>
            </div>
        </div>
    )
}

export default Edit;