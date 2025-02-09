<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use Illuminate\Http\JsonResponse;

class ProductController extends Controller
{
    /**
     * get list of products for a supplier
     * @return JsonResponse
    */
    public function index(): JsonResponse
    {
        $products = Product::where('supplier_id', auth()->id())
            ->select('id', 'name', 'description', 'sku', 'price', 'quantity', 'supplier_id')
            ->paginate();

        return response()->json([
            'data' => $products,
            'message' => 'Product data retrieved successfully',
        ], 200);
    }

    /**
     * store a product
     * @param StoreProductRequest $request
     * @return JsonResponse
     */

    public function store(StoreProductRequest $request): JsonResponse
    {
        $product = Product::create([
            'supplier_id' => auth()->id(),
            'name' => $request->name,
            'sku' => $request->sku,
            'description' => $request->description,
            'price' => $request->price,
            'quantity' => $request->quantity,
        ]);

        return response()->json([
            'message' => 'Product created successfully',
            'data' => $product
        ], 201);
    }

    public function update(UpdateProductRequest $request, $id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $product->update([
            'name' => $request->name,
            'sku' => $request->sku,
            'description' => $request->description,
            'price' => $request->price,
            'quantity' => $request->quantity,
        ]);

        return response()->json([
            'message' => 'Product updated successfully',
            'data' => $product
        ], 201);
    }

    /**
     * delete a product
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $product->delete();
        return response()->json(['message' => 'Product deleted successfully'], 201);
    }

    public function productsAvailable(): JsonResponse
    {
        $products = Product::where('quantity', '>', 0)
            ->select('id', 'name', 'description', 'sku', 'price', 'quantity', 'supplier_id')
            ->with(['supplier' => function ($query) {
                $query->select('id', 'name');
            }])
            ->paginate();

        return response()->json([
            'data' => $products,
            'message' => 'Products available for purchase',
        ], 200);
    }

}
