<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\IsSupplier;
use App\Http\Middleware\IsUser;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('app', function (){
    return view('app');
});

Route::middleware([isSupplier::class, 'auth', 'verified'])->group(function () {

    Route::get('/dashboard-supplier', function () {
        return Inertia::render('SupplierDashboard');
    })->name('dashboard-supplier');

    Route::get('/products', [ProductController::class, 'index'])->name('products.index');
    Route::post('/products', [ProductController::class, 'store'])->name('products.store');
    Route::put('/products/{id}', [ProductController::class, 'update'])->name('products.update');
    Route::delete('/products/{id}', [ProductController::class, 'destroy'])->name('products.destroy');
    Route::prefix('order')->group(function () {
        Route::get('/supplier/index', [OrderController::class,'supplierIndex'])->name('order.supplier.index');
        Route::get('/supplier/show', [OrderController::class,'supplierShow'])->name('order.supplier.show');
    });
});


Route::middleware([isUser::class, 'auth', 'verified'])->group(function () {

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/products-available', [ProductController::class, 'productsAvailable'])->name('products.available');

    Route::prefix('cart')->group(function () {
        Route::get('/', [CartController::class, 'index'])->name('cart.index');
        Route::get('show', [CartController::class, 'show'])->name('cart.show');
        Route::post('/add', [CartController::class, 'addToCart'])->name('cart.add');
        Route::delete('/remove/{productId}', [CartController::class, 'removeFromCart'])->name('cart.remove');
        Route::put('/update-quantity', [CartController::class, 'updateQuantity'])->name('cart.update.quantity');
    });

    Route::post('/checkout/process', [CheckoutController::class, 'checkoutProcess'])->name('checkout.process');
    Route::prefix('order')->group(function () {
        Route::get('/', [OrderController::class, 'index'])->name('order.index');
        Route::get('/show', [OrderController::class, 'show'])->name('order.show');
    });
});


require __DIR__.'/auth.php';
