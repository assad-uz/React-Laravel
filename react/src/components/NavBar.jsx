import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <NavLink className="navbar-brand" to="/">Customer CRUD</NavLink>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            {/* '/' Path টি list.jsx কে লোড করবে */}
                            <NavLink className="nav-link" to="/">Customer List</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/insert">Add Customer</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;