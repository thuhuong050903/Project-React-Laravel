<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration
{
    public function up()
    {
        Schema::create('appointments', function (Blueprint $table) {
            $table->id('appointment_id')->autoIncrement();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('apartment_id');
            $table->dateTime('appointment_date_time');
            $table->string('status');
            $table->foreign('user_id')->references('id')->on('users') ->onDelete('cascade');
            $table->foreign('apartment_id')->references('apartment_id')->on('apartments') ->onDelete('cascade');
        });
    }
    public function down()
    {
        Schema::dropIfExists('appointments');
    }
};
