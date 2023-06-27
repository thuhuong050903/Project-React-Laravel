<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ratings extends Model
{
    use HasFactory;
    protected $table ='ratings';
    protected $primaryKey ='rating_id';
    public $timestamps = false;
    protected $fillable = [
        'apartment_id',
        'user_id',
        'number_rating',
        'comment'
    ];
    

}
