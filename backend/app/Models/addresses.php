<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class addresses extends Model
{
    use HasFactory;
    protected $table = 'addresses';
    protected $primaryKey = 'address_id';

    public function contracts()
    {
        return $this->hasMany('App\Models\contracts', 'user_id');
    }
    
}
