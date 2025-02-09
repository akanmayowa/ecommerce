<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->decimal('total_amount', 10, 2);
            $table->timestamp('order_date')->default(now());
            $table->string('status')->default('pending');
            $table->text('shipping_address')->nullable();
            $table->string('billing_name');
            $table->string('billing_phone_number');
            $table->text('billing_address')->nullable();
            $table->string('billing_post_code');
            $table->string('tracking_number')->unique();
            $table->string('payment_method', 50)->default('cash');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
