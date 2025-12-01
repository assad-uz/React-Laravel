import axios from 'axios';

// ✅ একটি কাস্টম axios ইনস্ট্যান্স তৈরি করা হলো
const api = axios.create({
    // আপনার Laravel সার্ভারের বেস URL
    baseURL: 'http://127.0.0.1:8000', 
    
    // ✅ সবচেয়ে গুরুত্বপূর্ণ লাইন: কুকি এবং সেশন ক্রেডেনশিয়াল পাঠানোর জন্য
    withCredentials: true, 
    
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

export default api;