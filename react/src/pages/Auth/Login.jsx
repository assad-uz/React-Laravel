import React, { useState } from 'react';
import api from '../../axios'; // ✅ কাস্টম 'api' ইনস্ট্যান্স
import { useNavigate, NavLink } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // ত্রুটি রিসেট

        try {
            // ১. CSRF কুকি সংগ্রহ: Sanctum SPA-এর জন্য আবশ্যক
            await api.get('/sanctum/csrf-cookie'); 

            // ২. লগইন ক্রেডেনশিয়াল সহ POST রিকোয়েস্ট (Breeze রুট)
            await api.post('/login', { 
                email: email,
                password: password,
            });

            // লগইন সফল হলে ইউজার ডেটা Fetch করা যেতে পারে (ঐচ্ছিক)
            // const userResponse = await api.get('/user');
            // console.log("Logged in user:", userResponse.data);

            navigate('/'); // সফল হলে কাস্টমার লিস্ট পেজে রিডাইরেক্ট
            alert('Login Successful!');

        } catch (err) {
            console.error("Login Error:", err);
            // ৪২২ স্ট্যাটাস মানে ভ্যালিডেশন বা ভুল ক্রেডেনশিয়াল
            if (err.response && err.response.status === 422) {
                setError('Invalid credentials.');
            } else {
                setError('Login failed. Please check your network or server.');
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className='col-md-6 offset-md-3'>
                <h2>User Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" required />
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" required />
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <button type="submit" className="btn btn-primary">Login</button>
                    <NavLink to="/register" className="btn btn-link">Need an account? Register</NavLink>
                </form>
            </div>
        </div>
    );
};

export default Login;