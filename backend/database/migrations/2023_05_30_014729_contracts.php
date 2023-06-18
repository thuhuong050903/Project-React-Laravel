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
        //
        Schema::create('contracts', function (Blueprint $table) {
            $table->id('contract_id')-> autoIncrement();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('apartment_id');
            $table->date('start_date');
            $table->date('end_date');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users') ->onDelete('cascade');
            $table->foreign('apartment_id')->references('apartment_id')->on('apartments') ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contracts');
        //
    }
};
