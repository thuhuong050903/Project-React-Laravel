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
        Schema::create('apartments', function (Blueprint $table) {
            $table->id('apartment_id')-> autoIncrement();
            $table->unsignedBigInteger('user_id');
            $table->text('description');
            $table->decimal('price', 10, 2);
            $table->integer('number_room');
            $table->float('area');
            $table->unsignedBigInteger('address_id');
            $table->string('type_room');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users') ->onDelete('cascade');
            $table->foreign('address_id')->references('address_id')->on('addresses') ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('apartments');
        //
    }
};
