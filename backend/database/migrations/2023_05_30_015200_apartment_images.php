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
        Schema::create('apartment_images', function (Blueprint $table) {
            $table->id('image_id')->autoIncrement();
            $table->unsignedBigInteger('apartment_id');
            $table->text('image_path');
            $table->timestamps();

            $table->foreign('apartment_id')->references('apartment_id')->on('apartments') ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('apartment_images');
    }
};
