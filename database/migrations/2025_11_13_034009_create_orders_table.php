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
            $table->id();
            $table->string('order_code')->unique();
            $table->foreignId('package_id')->constrained()->cascadeOnDelete();

            $table->string('buyer_name');
            $table->string('buyer_phone');
            $table->string('buyer_email')->nullable();

            $table->unsignedInteger('adult_count')->default(0);
            $table->unsignedInteger('child_count')->default(0);
            $table->unsignedInteger('total_price');

            $table->enum('payment_status', ['pending', 'paid', 'failed', 'expired'])->default('pending');
            $table->enum('source', ['online', 'offline'])->default('online');

            $table->string('midtrans_order_id')->nullable();
            $table->string('midtrans_snap_token')->nullable();

            $table->timestamp('paid_at')->nullable();
            $table->timestamp('checked_in_at')->nullable();
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
