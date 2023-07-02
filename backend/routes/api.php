<?php

use App\Http\Controllers\EmailController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\APIController;	
use App\Http\Controllers\PasswordResetController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ImagesController;

Route::get('/email/verify', [App\Http\Controllers\AuthController::class, 'verifyEmail'])->name('email.verify');
Route::post('/reset-password', [App\Http\Controllers\PasswordResetController::class, 'sendResetLink']);
Route::post('/confirm-password-reset', [App\Http\Controllers\PasswordResetController::class, 'confirmPasswordReset']);
Route::get('/verify-email/{token}', [App\Http\Controllers\AuthController::class, 'verifyEmail']);
Route::get('password/reset', [App\Http\Controllers\PasswordResetController::class, 'confirmPasswordReset'])->name('password.reset');
// Route::get('/reset-password/{token}/{email}', [App\Http\Controllers\PasswordResetController::class, 'reset'])->name('password.reset');
Route::get('/reset-password/{token}/{email}', [App\Http\Controllers\PasswordResetController::class, 'reset'])->name('password.reset')->middleware('signed');




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
Route::get('/check-email-exists/{email}', [App\Http\Controllers\AuthController::class, 'checkEmailExists']);


Route::post('/upload',[ImagesController::class,'upload']);
Route::get('/images',[ImagesController::class,'index']);


Route::post('/bookings',[App\Http\Controllers\BookApartController::class,'store']);
Route::post('/bookAppointment',[App\Http\Controllers\BookAppointmentController::class,'store']);


Route::get('/photos/{apartment_id}', [ImagesController::class, 'getRelatedPhotos']);
Route::post('add-photo/{apartment_id}', [ImagesController::class, 'addPhoto']);
Route::post('/upload',[ImagesController::class,'upload']);


///--------------Đoạn này của Đi-----------////
Route::get('/get-appointment',[App\Http\Controllers\ApointmentController::class,'getApartments']);					
Route::get('/get-appointment/{appointment}', [App\Http\Controllers\ApointmentController::class,'getOneApartments']);								
Route::post('/add-appointment',[App\Http\Controllers\ApointmentController::class,'addApartments']);								
Route::delete('/delete-appointment/{appointment}', [App\Http\Controllers\ApointmentController::class,'deleteApartments']);
Route::put('/edit-appointment/{appointment}',[App\Http\Controllers\ApointmentController::class,'editApartments']);	




///------------------------- của ĐI nhớ bỏ vô Apointment-------------------------///
Route::get('/get-confirmappointment',[App\Http\Controllers\ApointmentController::class,'getAppointment']);	
Route::get('/get-confirmappointment/{appointment_id}', [App\Http\Controllers\ApointmentController::class,'getOneAppointment']);	
Route::put('update-appointment/{id}', [App\Http\Controllers\ApointmentController::class,'update']);


Route::get('related-photos/{apartment_id}', [ImagesController::class, 'getRelatedPhotos']);
Route::post('add-photo/{apartment_id}', [ImagesController::class, 'addPhoto']);
Route::post('/upload',[ImagesController::class,'upload']);
Route::delete('delete-photo/{image_id}', [\App\Http\Controllers\ImagesController::class, 'deletePhoto']);


//-------------------- Address----------------------//
Route::get('/get-address', [App\Http\Controllers\ApointmentController::class, 'getAddress']);
Route::get('/get-address/{address_id}', [App\Http\Controllers\ApointmentController::class,'getOneAddress']);		


Route::post('/ratings',[App\Http\Controllers\starRatingController::class,'store']);
Route::get('/ratings', [App\Http\Controllers\starRatingController::class, 'getRatings']);
Route::get('/rating-count/{id}', [App\Http\Controllers\starRatingController::class, 'getRatingCountByUser']);


Route::get('/history-appointments/{userId}', [App\Http\Controllers\BookAppointmentController::class, 'show']);

Route::get('/history-apartments/{userId}', [App\Http\Controllers\BookApartController::class, 'show']);
Route::get('/get-contract',[App\Http\Controllers\APIController::class,'getContracts']);


Route::get('/SeederApartmentPage/{id}', [App\Http\Controllers\APIController::class, 'getSeederApartments']);


Route::get('/SeederInfo/{userId}', [App\Http\Controllers\APIController::class, 'getSeederInfo']);


Route::post('/apartment-issues', [App\Http\Controllers\ApartmentIssueController::class, 'store']);
