<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class apartments extends Model
{
    use HasFactory;
    protected $table = 'apartments';
    protected $primaryKey = 'apartment_id';
    public function users()
    {
        return $this->belongsTo(users::class, 'user_id');
    }
    public function apartmentIssues()
    {
        return $this->hasMany('App\Models\apartmentIssue', 'apartment_id');
    }
    public function apartmentImage()
    {
        return $this->hasMany('App\Models\apartmentImage', 'apartment_id');
    }
    public function Images()
    {
        return $this->hasMany('App\Models\Images', 'apartment_id');
    }
    public function appointments()
    {
        return $this->hasMany('App\Models\appointments', 'apartment_id');
    }
    public function book_apartments()
    {
        return $this->hasMany('App\Models\book_apartments', 'apartment_id');
    }
    public function contracts()
    {
        return $this->hasMany('App\Models\contracts', 'apartment_id');
    }
    public function service_Apartment()
    {
        return $this->hasMany('App\Models\service_Apartment', 'apartment_id');
    }
    public function ratings()
    {
        return $this->hasMany('App\Models\ratings', 'apartment_id');
    }
    public function addresses()
    {
        return $this->belongsTo('App\Models\addresses','apartment_id');
    }
    
    public function services()
    {
        return $this->belongsToMany(Services::class, 'service_apartment', 'apartment_id', 'service_id');
    }
}