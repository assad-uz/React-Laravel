<?php

namespace App\Http\Controllers; // নেমস্পেস নিশ্চিত করুন

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    // R - Read All
    public function index()
    {
        return response()->json(Customer::all());
    }

    // C - Create
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|unique:customers,email', 
            'address' => 'nullable',
        ]);

        $customer = Customer::create($validated);
        return response()->json($customer, 201);
    }

    // U - Update
    public function update(Request $request, Customer $customer)
    {
        $validated = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|unique:customers,email,' . $customer->id, 
            'address' => 'nullable',
        ]);
        
        $customer->update($validated);
        return response()->json($customer);
    }

    // D - Delete
    public function destroy(Customer $customer)
    {
        $customer->delete();
        return response()->json(null, 204);
    }
}