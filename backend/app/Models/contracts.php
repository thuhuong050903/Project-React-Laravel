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
    public function users()
    {
        return $this->belongsTo(users::class, 'user_id')->onDelete('cascade');
    }
    public function apartment()
    {
        return $this->belongsTo('App\Models\contracts', 'contract_id')->onDelete('cascade');
    }

}
