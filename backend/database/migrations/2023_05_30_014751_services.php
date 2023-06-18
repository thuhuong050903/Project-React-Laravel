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
        Schema::create('services', function (Blueprint $table) {
            $table->id('service_id')->autoIncrement();
            $table->text('description');
            $table->decimal('price', 10, 2);
            $table->string('contact_info');
            $table->timestamps();

        });
    }

    public function down()
    {
        Schema::dropIfExists('services');
    }
};
