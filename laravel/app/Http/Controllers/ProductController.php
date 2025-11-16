<?php 
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProductController extends Controller
{
    // R - Read All (সকল পণ্য দেখুন)
    public function index()
    {
        return response()->json(Product::all());
    }

    // C - Create (নতুন পণ্য তৈরি করুন)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|max:255',
            'description' => 'nullable',
            'price' => 'required|numeric|min:0',
        ]);

        $product = Product::create($validated);
        return response()->json($product, 201);
    }

    // R - Read Single (একটি পণ্য দেখুন)
    public function show(Product $product)
    {
        return response()->json($product);
    }

    // U - Update (পণ্য আপডেট করুন)
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|max:255',
            'description' => 'nullable',
            'price' => 'required|numeric|min:0',
        ]);
        
        $product->update($validated);
        return response()->json($product);
    }

    // D - Delete (পণ্য ডিলিট করুন)
    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(null, 204);
    }
}