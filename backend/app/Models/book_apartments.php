<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class book_apartments extends Model
{
    use HasFactory;
    protected $table ='book_apartments';
    public $timestamps = true;

    public function apartments()
    {
        return $this->belongsTo('App\Models\apartments', 'apartment_id');
    }
    public function users()
    {
        return $this->belongsTo(users::class, 'user_id')->withDefault();  //withDefault() nếu không tìm thấy bản ghi  trả về null để tránh bị lỗi
    }
   

}