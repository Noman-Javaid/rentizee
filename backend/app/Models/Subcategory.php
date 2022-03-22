<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subcategory extends Model
{
    use HasFactory;
    protected $table = 'subcategories';
    protected $fillable = [
        'meta_title',
        'meta_keyword',
        'meta_desc',
        'slug',
        'posts',
        'parentcat',
        'name',
        'catdesc',
        'status',
    ];
}
