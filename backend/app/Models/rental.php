<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class rental extends Model
{
    use HasFactory;
    protected $table = 'rentals';
    protected $fillable = [
        'auth_id',
        'auth_name',
        'auth_role',
        'auth_email',
        'province',
        'city',
        'category',
        'subcat',
        'phone1',
        'phone2',
        'keywords',
        'title',
        'description',
        'image',
        'address',
        'price',
        'duration',
        'condition',
        'elevator',
        'lawn',
        'roof',
        'parking',
        'operator',
        'area',
        'floors',
        'bedrooms',
        'bathrooms',
        'kitchens',
        'car_model',
        'milage',
        'fuel_average',
        'fuel_type',
        'elec_model',
        'company',
        'visits',
        'phone_views',
    ];
}
