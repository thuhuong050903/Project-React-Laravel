<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Images extends Model
{
    use HasFactory;
    protected $fillable=['name'];
    protected $primaryKey = 'id';
    public function apartments()
    {
        return $this->belongsTo(apartments::class, 'apartment_id')->onDelete('cascade');
    }
}
