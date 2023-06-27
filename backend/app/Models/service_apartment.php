<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class service_apartment extends Model
{
    use HasFactory;
    protected $table ='service_apartment';
    public $timestamps = false;
    function apartments()  {
        return $this->belongsTo('App\Models\apartments', 'apartment_id');

    }
    function services()  {
        return $this->belongsTo('App\Models\services', 'apartment_id');

    }

}
