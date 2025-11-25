import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // যদি আপনার বয়লারপ্লেটে থাকে

// .env.local থেকে Base URL ইমপোর্ট করা হলো
const API_URL = import.meta.env.VITE_API_BASE_URL;
// যদি .env.local ঠিকভাবে লোড না হয়, তবে ডিফল্ট মান হিসেবে হার্ডকোড করা হলো
// const API_URL = 'http://127.0.0.1:8000/api';

function App() {
  // ১. স্টেট তৈরি: কাস্টমার ডেটা সংরক্ষণ করবে
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ২. ডেটা আনার ফাংশন
  const fetchCustomers = async () => {
    try {
      // Axios GET রিকোয়েস্ট পাঠানো হলো
      const response = await axios.get(`${API_URL}/customers`);

      // সফল হলে, স্টেট আপডেট করা হলো
      setCustomers(response.data);
      setLoading(false);

      console.log("Data fetched successfully:", response.data);
    } catch (error) {
      // কোনো ত্রুটি হলে (যেমন CORS বা সার্ভার বন্ধ থাকলে)
      console.error("Error fetching customers:", error);
      setLoading(false);
    }
  };

  // ৩. useEffect ব্যবহার: কম্পোনেন্টটি প্রথমবার রেন্ডার হওয়ার পরই ডেটা আনুন
  useEffect(() => {
    const fetchCustomers = async () => {
        try {
            // ১. লোডিং স্টেট শুরু: এটি সাধারণত ফাংশনের বাইরে থাকে, 
            // কিন্তু React এখানে একই ফাংশনের মধ্যে রাখতে বারণ করছে।
            // setCustomers([]); // (ঐচ্ছিক)
            // setLoading(true); // (ঐচ্ছিক) 

            const response = await axios.get(`${API_URL}/customers`); 
            
            // ২. স্টেট আপডেট
            setCustomers(response.data);
            setLoading(false); // লোডিং শেষ 
        } catch (error) {
            console.error("Error fetching customers:", error);
            setLoading(false);
        }
    };
    
    // ফাংশনটিকে useEffect-এর ভেতরে তৈরি করে এখানেই কল করা হলো
    fetchCustomers(); 
}, []); // খালি অ্যারে মানে শুধু একবার রান হবে

  // ৪. UI রেন্ডারিং
  if (loading) {
    return <h2>Loading customer data...</h2>;
  }

  return (
    <div className="App">
      <h1>Customer List from Laravel API</h1>

      {customers.length === 0 ? (
        <p>No customers found. Please add data via Postman first.</p>
      ) : (
        <ul>
          {customers.map((customer) => (
            <li key={customer.id}>
              **Name:** {customer.name} | **Email:** {customer.email} |
              **Address:** {customer.address || "N/A"}
            </li>
          ))}
        </ul>
      )}

      <button onClick={fetchCustomers}>Refresh List</button>
    </div>
  );
}

export default App;
