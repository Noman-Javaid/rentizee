<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRentalsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rentals', function (Blueprint $table) {
            $table->id();
            $table->integer('auth_id');
            $table->string('auth_name');
            $table->string('auth_role');
            $table->string('auth_email');
            $table->string('province');
            $table->string('city');
            $table->string('category');
            $table->string('subcat');
            $table->string('phone1');
            $table->string('phone2');
            $table->text('keywords')->nullable();
            $table->text('title');
            $table->text('description');
            $table->string('image');
            $table->mediumText('address');
            $table->integer('price');
            $table->string('duration')->nullable();
            $table->string('condition')->nullable();
            $table->tinyInteger('elevator')->default('0');
            $table->tinyInteger('lawn')->default('0');
            $table->tinyInteger('roof')->default('0');
            $table->tinyInteger('parking')->default('0');
            $table->tinyInteger('operator')->default('0');
            $table->integer('visits')->default('0');
            $table->integer('phone_views')->default('0');
            $table->integer('area')->nullable();
            $table->integer('floors')->nullable();
            $table->integer('bedrooms')->nullable();
            $table->integer('bathrooms')->nullable();
            $table->integer('kitchens')->nullable();
            $table->string('car_model')->nullable();
            $table->integer('milage')->nullable();
            $table->integer('fuel_average')->nullable();
            $table->string('fuel_type')->nullable();
            $table->string('elec_model')->nullable();
            $table->string('company')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void 
     */
    public function down()
    {
        Schema::dropIfExists('rentals');
    }
}
