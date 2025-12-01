<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CustomerController;

Route::resource('customers', CustomerController::class);

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// CSRF কুকি রুট (SPA এর জন্য প্রয়োজনীয়)
Route::get('/sanctum/csrf-cookie', function (Request $request) {
    return response()->noContent();
})->middleware('web');

// অথেন্টিকেশন রুটগুলি (লগইন, রেজিস্ট্রেশন, পাসওয়ার্ড রিসেট)
require __DIR__.'/auth.php';