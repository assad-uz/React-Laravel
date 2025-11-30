<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    // R - Read All
    public function index()
    {
        return response()->json(Customer::all());
    }

    // S - Show (Read Single)
    public function show($id)
    {
        $customer = Customer::find($id);

        if (!$customer) {
            return response()->json(['message' => 'Customer not found'], 404);
        }

        return response()->json($customer);
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
