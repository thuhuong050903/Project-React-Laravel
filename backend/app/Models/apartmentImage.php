<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class apartmentImage extends Model
{
    use HasFactory;
    protected $table = "apartment_images";
    protected $primaryKey = 'image_id';

    public function apartments()
    {
        return $this->belongsTo(apartments::class, 'apartment_id')->onDelete('cascade');
    }
}
