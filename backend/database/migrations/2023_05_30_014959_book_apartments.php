<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('book_apartments', function (Blueprint $table) {
            $table->id('book_id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('apartment_id');
            $table->dateTime('check_in_date');
            $table->dateTime('check_out_date');
            $table->decimal('total_price', 10, 2);
            $table->string('status');

            $table->foreign('user_id')->references('id')->on('users') ->onDelete('cascade');
            $table->foreign('apartment_id')->references('apartment_id')->on('apartments') ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('book_apartments');
    }
};
