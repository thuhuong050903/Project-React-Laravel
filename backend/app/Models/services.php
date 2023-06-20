<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class services extends Model
{
    use HasFactory;
    protected $table ="services";

    public $timestamps = false;
    protected $primaryKey = 'service_id';

    function service_apartment()  {
        return $this->hasMany('App\Models\service_apartment', 'apartment_id');

    }
}
