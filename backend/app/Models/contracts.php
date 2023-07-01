<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class contracts extends Model
{
    use HasFactory;
    protected $contracts ='contracts';

    protected $primaryKey = 'contract_id';
    
    public $timestamps = false;

    public function users()
    {
        return $this->belongsTo(users::class, 'user_id')->withDefault();  //withDefault() nếu không tìm thấy bản ghi  trả về null để tránh bị lỗi
    }

    public function apartments()
    {
        return $this->belongsTo(apartments::class, 'apartment_id')->withDefault();
    }

    public function addresses()
    {
        return $this->belongsTo(addresses::class, 'address_id')->withDefault();
    }
    
    
    

}
