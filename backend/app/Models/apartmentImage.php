<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class apartmentImage extends Model
{
    use HasFactory;
    protected $table ='apartment_images';
    protected $primaryKey = 'image_id';

    public function apartment()
    {
        return $this->belongsTo('App\Models\apartments','apartment_id');
    }
}
