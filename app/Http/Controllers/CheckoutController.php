<?php

namespace App\Http\Controllers;

use App\Http\Requests\CheckoutProcessingRequest;
use App\Services\PurchaseService;
use Illuminate\Http\JsonResponse;

class CheckoutController extends Controller
{
    public function __construct(private readonly PurchaseService $purchaseService)
    {
    }

    /**
     * handle checkout process request
     * @param CheckoutProcessingRequest $request
     * @return JsonResponse
     */
    public function checkoutProcess(CheckoutProcessingRequest $request): JsonResponse
    {
        $result = $this->purchaseService->purchaseProduct($request->validated());
        return response()->json([
            'message' => $result['message'],
            'data' => $result['data']?? null,
        ], $result['status_code']);
    }
}
