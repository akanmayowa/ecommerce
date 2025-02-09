<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    /**
     * show order history page
     * @return Response
     */
    public function index(): Response
    {
        return Inertia::render('OrderHistory');
    }

    /**
     * get order history for auth user
     * @return JsonResponse
    */
    public function show(): JsonResponse
    {
        $user = auth()->user();
        $orders = Order::with(['orderItems.product'])
            ->where('user_id', $user->id)
            ->orderBy('order_date', 'desc')
            ->paginate();

        $ordersWithDetails = $orders->through(function ($order) {
            return [
                'items' => $order->orderItems->map(function ($item) use ($order) {
                    return [
                        'order_id' => $order->id,
                        'order_date' => $order->order_date,
                        'product_name' => $item->product->name,
                        'quantity' => $item->quantity,
                        'price' => $item->price,
                        'total_price' => $item->total_price,
                        'sku' => $item->product->sku,
                    ];
                })
            ];
        });

        return response()->json([
            'data' => $ordersWithDetails,
            'message' => 'Order history retrieved successfully',
        ], 200);
    }

    /**
     * show suppliers order history page
     * @return Response
     */
    public function supplierIndex(): Response
    {
        return Inertia::render('SupplierOrders');
    }


    /**
     * get supplier's order history for auth user
     * @return JsonResponse
     */
    public function supplierShow(): JsonResponse
    {
        $user = auth()->user();
        $orders = Order::select('id', 'user_id', 'order_date', 'total_amount')
            ->whereHas('orderItems.product', function ($query) use ($user) {
            $query->where('supplier_id', $user['id']);
        })
            ->with(['orderItems.product', 'user'])
            ->orderBy('order_date', 'desc')
            ->paginate();

        $ordersWithDetails = $orders->through(function ($order) {
            return  $order->orderItems->map(function ($item) use ($order) {
                    return [
                        'order_id' => $order->id,
                        'order_date' => $order->order_date,
                        'customer_name' => $order->user->name,
                        'customer_email' => $order->user->email,
                        'product_name' => $item->product->name,
                        'quantity' => $item->quantity,
                        'total_price' => $item->total_price,
                    ];
                });
        });

        return response()->json([
            'data' => $ordersWithDetails,
            'message' => 'Supplier\'s order history retrieved successfully',
        ], 200);
    }
}
