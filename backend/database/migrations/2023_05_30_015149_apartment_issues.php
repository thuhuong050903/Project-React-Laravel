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
        Schema::create('apartment_issues', function (Blueprint $table) {
            $table->id('issue_id')->autoIncrement();
            $table->unsignedBigInteger('apartment_id');
            $table->unsignedBigInteger('user_id');
            $table->text('description');
            $table->date('report_date');
            $table->boolean('resolved')->default(false);
            $table->timestamps();

            $table->foreign('apartment_id')->references('apartment_id')->on('apartments') ->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users') ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('apartment_issues');
    }
};
