import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar'; 
import List from './pages/customer/list'; 
import Insert from './pages/customer/insert';
import Edit from './pages/customer/edit';
import Login from './pages/Auth/Login'; 
import Register from './pages/Auth/Register';


function App() {
    return (
        <Router>
            <NavBar /> 
            <div className="container-fluid">
                <Routes>
                    <Route path="/" element={<List />} /> 
                    <Route path="/insert" element={<Insert />} />
                    <Route path="/edit/:id" element={<Edit />} />
                    <Route path="/login" element={<Login />} /> 
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;