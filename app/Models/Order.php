<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    use HasFactory;
    use HasUuids;

    /**
     * The attributes that are mass assignable.
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'total_amount',
        'order_date',
        'status',
        'shipping_address',
        'billing_name',
        'billing_phone_number',
        'billing_address',
        'billing_post_code',
        'tracking_number',
        'payment_method',
     ];

    /**
     * association between order and user.
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * the one-to-many relationship with OrderItem
     * @return HasMany
     */
    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }
}
