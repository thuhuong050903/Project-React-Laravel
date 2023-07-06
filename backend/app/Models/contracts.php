<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class contracts extends Model
{
    use HasFactory;
    protected $contracts ='contracts';
    protected $table = 'contracts';
    protected $primaryKey = 'contract_id';
    public $timestamps = false;
    public function user()
    {
        return $this->belongsTo(users::class, 'user_id');
    }
    public function apartment()
    {
        return $this->belongsTo(apartments::class, 'apartment_id');
    }
}
