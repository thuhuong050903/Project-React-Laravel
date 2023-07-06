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
}
