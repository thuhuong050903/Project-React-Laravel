<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointments extends Model
{
    use HasFactory;
    protected $table ='appointments';
    
    protected $primaryKey = 'appointment_id';
    public $timestamps = false;

}
