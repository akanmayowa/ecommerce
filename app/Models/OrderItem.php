<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderItem extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     * @var list<string>
     */
    protected $fillable = [
        'order_id',
        'product_id',
        'quantity',
        'price',
        'total_price',
    ];

    /**
     * the inverse relationship with Order
     * @return belongsTo
     */
    public function order():belongsTo
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * the relationship with Product
     * @return belongsTo
     *
    */
    public function product(): belongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
