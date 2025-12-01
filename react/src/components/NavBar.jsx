import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <NavLink className="navbar-brand" to="/">Customer CRUD</NavLink>
                
                <div className="collapse navbar-collapse" id="navbarNav">
                    {/* বাম দিকে: Customer Management Links */}
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Customer List</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/insert">Add Customer</NavLink>
                        </li>
                    </ul>
                    
                    {/* ✅ ডান দিকে: Auth Links */}
                    <ul className="navbar-nav ms-auto"> 
                        <li className="nav-item">
                            <NavLink 
                                className="nav-link btn btn-outline-light me-2" // স্টাইল যোগ করা হলো
                                to="/login"
                            >
                                Login
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink 
                                className="nav-link btn btn-success" // স্টাইল যোগ করা হলো
                                to="/register"
                            >
                                Register
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;