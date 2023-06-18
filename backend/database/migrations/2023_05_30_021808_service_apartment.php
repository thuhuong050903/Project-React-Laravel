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
        Schema::create('service_apartment', function (Blueprint $table) {
            $table->id('service_apartment_id')->autoIncrement();
            $table->unsignedBigInteger('service_id');
            $table->unsignedBigInteger('apartment_id');
            $table->timestamps();

            $table->foreign('service_id')->references('service_id')->on('services') ->onDelete('cascade');
            $table->foreign('apartment_id')->references('apartment_id')->on('apartments') ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('service_apartment');
    }
};
