<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    public const USER = "user";
    public const SUPPLIER = "supplier";

    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }


    /**
     * check if auth user is shipper
     * @return bool
    */
    public static function isSupplier(): bool
    {
        return auth()->check()
            && auth()->user()->role == 'supplier';
    }


    /**
     * check if auth user is a shopper
     * @return bool
    */
    public static function isUser(): bool
    {
        return auth()->check() &&
            auth()->user()->role == 'user';
    }

    /**
     * Get the products added by the supplier.
     * @return HasMany
     */
    public function products(): HasMany
    {
        return $this->hasMany(Product::class, 'supplier_id');
    }

    /**
     *the relationship to orders where the user is the customer
     * @return HasMany
    */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
}
