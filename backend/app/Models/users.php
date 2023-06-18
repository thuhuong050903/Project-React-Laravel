<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;

class users extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'fullname',
        'email',
        'phone',
        'address',
        'password',
        'birthday',
        'role',
        'remember_token',
        'token',
        
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

     public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
    protected $table = 'users';
    protected $primaryKey = 'id';

    public function rating()
    {
        return $this->hasMany('App\Models\ratings', 'user_id');
    }

    public function contract()
    {
        return $this->hasMany('App\Models\contracts', 'user_id');
    }
    public function apartment()
    {
        return $this->hasMany('App\Models\apartments', 'user_id');
    }
    public function book_apartment()
    {
        return $this->hasMany('App\Models\book_apartments', 'user_id');
    }
    public function appointment()
    {
        return $this->hasMany('App\Models\appointments', 'user_id');
    }
    public function apartmentIssue()
    {
        return $this->hasMany('App\Models\apartmentIssue', 'user_id');
    }
}


