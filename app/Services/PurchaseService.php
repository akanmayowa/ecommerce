<?php

namespace App\Services;

use App\Models\Order;
use App\Models\Product;
use Exception;
use Illuminate\Support\Facades\DB;

class PurchaseService
{
    /**
     *  handle purchase of product
     * @param array $data
     * @return array
     */
    public function purchaseProduct(array $data): array
    {
        $user = auth()->user();
        if (!$user) {
            return [
                'message' => 'User not authenticated',
                'status_code' => 403
            ];
        }

        $cart = $data['cart'];
        $totalAmount = $data['total_amount'];
        $billingDetails = $data['billing_details'];

        DB::beginTransaction();
        try {
            $order = Order::create([
                'user_id' => $user->id,
                'total_amount' => $totalAmount,
                'billing_name' => $billingDetails['name'],
                'billing_phone_number' => $billingDetails['phone'],
                'billing_address' => $billingDetails['address'],
                'billing_post_code' => $billingDetails['postcode'],
                'tracking_number' => $this->generateTrackingNumber(),
             ]);

            foreach ($cart as $item) {
                $product = Product::find($item['product_id']);
                if (!$product || $product->quantity < $item['quantity']) {
                    DB::rollBack();
                    return  [
                        'message' => 'Product not found or out of stock: ' . $item['name'],
                        'status_code' => 404
                    ];
                }

                $order->orderItems()->create([
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'price' => $product->price,
                    'total_price' => $product->price * $item['quantity']
                ]);

                $product->decrement('quantity', $item['quantity']);
            }

            DB::commit();
            return [
                'message' => 'Order placed successfully',
                'status_code' => 200
            ];

        } catch (Exception $e) {
            DB::rollBack();
            return [
                'message' => 'An error occurred during checkout:- '.$e->getMessage(),
                'status_code' => 500,
            ];
        }
    }


    /**
     * generate unique tracking number for the order
     * @return string
     */
    private static function generateTrackingNumber(): string
    {
        $latestOrder = DB::table('orders')->count() + 1;
        $nextNumber = $latestOrder ? $latestOrder + 1 : 1;
        return 'TRK-' . str_pad($nextNumber, 6, '0', STR_PAD_LEFT);
    }
}
