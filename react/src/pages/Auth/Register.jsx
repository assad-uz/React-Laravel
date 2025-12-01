import React, { useState } from 'react';
import api from '../../axios'; //
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState({});

    const handleRegister = async (e) => {
        e.preventDefault();
        setError({}); // ত্রুটি রিসেট

        try {
            // ১. CSRF কুকি সংগ্রহ
            await api.get('/sanctum/csrf-cookie'); 

            // ২. রেজিস্ট্রেশন ডেটা সহ POST রিকোয়েস্ট (Breeze রুট)
            await api.post('/register', { 
                name,
                email,
                password,
                password_confirmation: passwordConfirmation, // Laravel এর জন্য এই Key টি আবশ্যক
            });

            alert('Registration Successful! Please login now.');
            navigate('/login'); // সফল হলে লগইন পেজে রিডাইরেক্ট

        } catch (err) {
            console.error("Registration Error:", err);
            if (err.response && err.response.status === 422) {
                // ভ্যালিডেশন ত্রুটি হ্যান্ডেল করা
                setError(err.response.data.errors);
            } else {
                setError({ general: 'Registration failed. Check server.' });
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className='col-md-6 offset-md-3'>
                <h2>User Registration</h2>
                <form onSubmit={handleRegister}>
                    {/* Name Field */}
                    <div className="mb-3">
                        <label>Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" required />
                        {error.name && <small className="text-danger">{error.name[0]}</small>}
                    </div>
                    {/* Email Field */}
                    <div className="mb-3">
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" required />
                        {error.email && <small className="text-danger">{error.email[0]}</small>}
                    </div>
                    {/* Password Field */}
                    <div className="mb-3">
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" required />
                        {error.password && <small className="text-danger">{error.password[0]}</small>}
                    </div>
                    {/* Confirm Password Field */}
                    <div className="mb-3">
                        <label>Confirm Password</label>
                        <input type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} className="form-control" required />
                    </div>
                    {error.general && <div className="alert alert-danger">{error.general}</div>}
                    <button type="submit" className="btn btn-success">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;