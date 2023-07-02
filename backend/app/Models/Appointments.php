<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointments extends Model
{
    use HasFactory;

    protected $fillable = [  //cập nhật status
        'status',
        // các trường khác nếu có
    ];
    public $timestamps = false; //phải tắt tự động cập nhật thơi gian thi  nó mới cho phép thay đổi status
    protected $table ='appointments';
    protected $primaryKey = 'appointment_id';


    public function users()
    {
        return $this->belongsTo(users::class, 'user_id')->withDefault();  //withDefault() nếu không tìm thấy bản ghi  trả về null để tránh bị lỗi
    }

    public function apartments()
    {
        return $this->belongsTo('App\Models\apartments', 'apartment_id');
    }

}