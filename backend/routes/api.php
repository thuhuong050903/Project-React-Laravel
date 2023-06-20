<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\APIController;	
use App\Http\Controllers\PasswordResetController;
use App\Http\Controllers\AuthController;

Route::get('/email/verify', [App\Http\Controllers\AuthController::class, 'verifyEmail'])->name('email.verify');
Route::post('/reset-password', [App\Http\Controllers\PasswordResetController::class, 'sendResetLink']);
Route::post('/confirm-password-reset', [App\Http\Controllers\PasswordResetController::class, 'confirmPasswordReset']);
Route::get('/verify-email/{token}', [App\Http\Controllers\AuthController::class, 'verifyEmail']);



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/get-apartment',[App\Http\Controllers\APIController::class,'getApartments']);					
Route::get('/get-apartment/{apartment_id}', [App\Http\Controllers\APIController::class,'getOneApartments']);								
Route::post('/add-apartment',[App\Http\Controllers\APIController::class,'addApartments']);								
Route::delete('/delete-apartment/{apartment_id}', [App\Http\Controllers\APIController::class,'deleteApartments']);
Route::put('/edit-apartment/{apartment_id}',[App\Http\Controllers\APIController::class,'editApartments']);								          
Route::post('/upload-image',[App\Http\Controllers\APIController::class,'uploadImage']);

Route::get('/get-address',[App\Http\Controllers\APIController::class,'getAddresses']);					
Route::get('/get-address/{address_id}', [App\Http\Controllers\APIController::class,'getOneAddresses']);								
Route::post('/add-address',[App\Http\Controllers\APIController::class,'addAddresses']);								
Route::delete('/delete-address/{address_id}', [App\Http\Controllers\APIController::class,'deleteAddresses']);
Route::put('/edit-address/{address_id}',[App\Http\Controllers\APIController::class,'editAddresses']);								          
Route::post('/upload-image',[App\Http\Controllers\APIController::class,'uploadImage']);

Route::get('/get-user',[App\Http\Controllers\APIController::class,'getUser']);
Route::get('/get-user/{id}', [App\Http\Controllers\APIController::class,'getOneUsers']);								
Route::delete('/delete-user/{id}', [App\Http\Controllers\APIController::class,'deleteUsers']);

Route::post('login', [App\Http\Controllers\AuthController::class,'login']);
Route::post('register', [App\Http\Controllers\AuthController::class,'register']);
Route::group(['middleware'=>'api'],function(){
    Route::post('logout', [App\Http\Controllers\AuthController::class,'logout']);
    Route::post('refresh', [App\Http\Controllers\AuthController::class,'refresh']);
    Route::post('me', [App\Http\Controllers\AuthController::class,'me']);
});


Route::post('/upload',[\App\Http\Controllers\ImagesController::class,'upload']);

Route::post('/bookings',[App\Http\Controllers\BookApartController::class,'store']);