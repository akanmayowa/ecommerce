<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCartRequest;
use App\Http\Requests\UpdateQuantityRequest;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{

    /**
     * show list of products in cart
     * @return Response
     */
    public function index(): Response
    {
        return Inertia::render('Cart');
    }


    /**
     * show list of products in cart
     * @return JsonResponse
     */
    public function show(): JsonResponse
    {
        $cart = session()->get('cart', []);
        return response()->json([
            'data' => $cart,
            'message' => 'cart products retrieved successfully'
        ]);
    }

    /**
     * add products to cart
     * @param StoreCartRequest $request
     * @return JsonResponse
     */
    public function addToCart(StoreCartRequest $request): JsonResponse
    {

        $product = Product::find($request->product_id);
        if (!$product) {
            return response()->json(['message' => 'Product not found!'], 404);
        }

        $cart = session()->get('cart', []);

        $cart[$product->id] = [
            "name" => $product->name,
            "price" => $product->price,
            "sku" => $product->sku,
            'description' => $product->description,
            "quantity" => 1,
            "product_id" => $product->id,
        ];

        session()->put('cart', $cart);
        return response()->json(['message' => 'Product added to cart successfully!']);
    }


    /**
     * @param int $productId
     * @return JsonResponse
     */
    public function removeFromCart(int $productId): JsonResponse
    {
        $cart = session()->get('cart', []);

        if (isset($cart[$productId])) {
            unset($cart[$productId]);
            session()->put('cart', $cart);
            return response()->json(['message' => 'Product removed from cart.']);
        }

        return response()->json(['message' => 'Product not found in cart.'], 404);
    }

    /**
     * @param UpdateQuantityRequest $request
     * @return JsonResponse
     */
    public function updateQuantity(UpdateQuantityRequest $request): JsonResponse
    {
        $productId = $request->product_id;
        $requestedQuantity = $request->quantity;
        $product = Product::where('id', $productId)->first();

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        if ($requestedQuantity < 1) {
            return response()->json(['message' => 'Quantity must be at least 1'], 400);
        }

        if ($requestedQuantity > $product->quantity) {
            return response()->json(['message' => 'Not enough stock available'], 400);
        }

        $cart = session()->get('cart', []);
        if (isset($cart[$productId])) {
            $cart[$productId]['quantity'] = $requestedQuantity;
            session()->put('cart', $cart);
        }

        return response()->json([
            'message' => 'Quantity updated successfully',
            'cart' => $cart
        ]);
    }
}
