import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate ,useParams } from 'react-router-dom';
const Edit = () => {
     const {id}=useParams()
    const navigate = useNavigate();
    const clickToBackHandler=()=>{
        navigate('/');
    }
 
    const [userField, setUserField] = useState({
        name: "",
        price: "",
        description: ""
    });
 
    useEffect(()=>{
        fetchUser();
    },[id])
 
    const fetchUser=async()=>{
        try{
            const result=await axios.get("http://127.0.0.1:8000/api/customer/"+id);
            console.log(result.data);
            setUserField(result.data)
        }catch(err){
            console.log("Something Wrong");
        }
    }
 
    const changeUserFieldHandler = (e) => {
        setUserField({
            ...userField,
            [e.target.name]: e.target.value
        });
        console.log(userField);
    }
     
    const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
            await axios.put("http://127.0.0.1:8000/api/customer/"+id, userField);
            navigate('/');  
        } catch (err) {
            console.log("Something Wrong");
        }
    }
 
    return(
        <div className="container">
            <h1>Edit Form</h1>
            <form>
                <div className="mb-3 mt-3">
                    <label className="form-label"> ID:</label>
                    <input type="text" className="form-control" id="id" placeholder="Enter Your Full Name" name="id" value={id} disabled />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Name:</label>
                    <input type="text" className="form-control" placeholder="EnterName" name="name" value={userField.name} onChange={e => changeUserFieldHandler(e)} />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">price:</label>
                    <input type="text" className="form-control" id="email" placeholder="Enter price" name="price" value={userField.price}  onChange={e => changeUserFieldHandler(e)}/>
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Description:</label>
                    <input type="text" className="form-control" id="description" placeholder="Enter description" name="description" value={userField.password} onChange={e => changeUserFieldHandler(e)}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={e=>onSubmitChange(e)}>Update</button>
            </form>
            <div className='container d-flex justify-content-center'>
                <button className='btn btn-primary' onClick={ clickToBackHandler}>Back To Home</button>
            </div>
        </div>
    );
};

export default Edit;