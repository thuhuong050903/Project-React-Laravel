<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class apartmentIssue extends Model
{
    use HasFactory;
    protected $table ='apartment_issues';

    protected $primaryKey ='issue_id';
    protected $fillable = [
        'apartment_id',
        'user_id',
        'description',
        'report_date',
        'resolved'
    ];
    public function users()
    {
        return $this->belongsTo(users::class, 'user_id')->withDefault();  //withDefault() nếu không tìm thấy bản ghi  trả về null để tránh bị lỗi
    }
    public function apartments()
    {
        return $this->belongsTo('App\Models\apartments', 'apartment_id');
    }

}
