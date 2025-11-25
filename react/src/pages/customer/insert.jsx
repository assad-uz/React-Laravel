import React, { useState } from 'react';
import List from './List';
import axios from 'axios';
const Insert = () => {
const [productField, setProductField] = useState({
        name: "",
        email: "",
        address: ""
    });
 
    const changeUserFieldHandler = (e) => {
        setProductField({
            ...productField,
            [e.target.name]: e.target.value
        });
        // console.log(userField);
 
    }
    const [loading,setLoading]=useState()
 
    const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
            const responce= await axios.post("http://127.0.0.1:8000/api/products", productField);
            console.log(responce)
            setLoading(true);
        } catch (err) {
            console.log("Something Wrong");
        }
    }
    if(loading){
        return <Insert/>
    }
 
    return (
        <div className="container">
                <div className='row'>
                    <div className='col-md-4'>
                        <h3>Add Customer</h3>
                        <form>
                            <div className="mb-3 mt-3">
                                 Customer Name:
                                <input type="text" className="form-control" id="name" placeholder="Enter Customer Full Name" name="name" onChange={e => changeUserFieldHandler(e)} />
                            </div>
                            <div className="mb-3 mt-3">
                              Email:
                                <input type="text" className="form-control" id="price" placeholder="Enter email" name="price" onChange={e => changeUserFieldHandler(e)} required/>
                            </div>
                            <div className="mb-3 mt-3">
                              Address:
                                <input type="text" className="form-control" id="password" placeholder="Enter address" name="description" onChange={e => changeUserFieldHandler(e)} required/>
                            </div>
                             
                            <button type="submit" className="btn btn-primary" onClick={e => onSubmitChange(e)}>Add product</button>
                        </form>
                    </div>
                    <div className='col-md-10'>
                        <List />
                    </div>
                </div>
        </div>
    )
};


export default Insert;