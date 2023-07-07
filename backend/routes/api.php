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

// Book apartment and appointments

Route::post('/bookings',[App\Http\Controllers\BookApartController::class,'store']);
Route::post('/bookAppointment',[App\Http\Controllers\BookAppointmentController::class,'store']);

// Route related to Apointments 
Route::get('/get-appointment/{userId}', [App\Http\Controllers\ApointmentController::class, 'getAppointment']);
Route::get('/get-appointment/{appointment_id}', [App\Http\Controllers\ApointmentController::class, 'getOneAppointment']);
Route::put('/update-appointment/{id}', [App\Http\Controllers\ApointmentController::class, 'update']);
Route::get('/get-appointments', [App\Http\Controllers\ApointmentController::class, 'getAppointments']);
// Route ratings//
Route::post('/add-ratings', [App\Http\Controllers\starRatingController::class, 'store']);
Route::get('/get-ratings', [App\Http\Controllers\starRatingController::class, 'getRatings']);
Route::get('/rating-count/{id}', [App\Http\Controllers\starRatingController::class, 'getRatingCountByUser']);

//-------------------------Contracts---------------//
Route::get('/get-contracts/{userId}', [App\Http\Controllers\ApointmentController::class, 'getContracts']);
Route::get('/get-contracts/{contract_id}', [App\Http\Controllers\ApointmentController::class, 'getOneContracts']);
Route::post('/add-contracts', [App\Http\Controllers\ApointmentController::class, 'addContracts']);
Route::put('/update-contracts/{id}', [App\Http\Controllers\ApointmentController::class, 'updateContracts']);
Route::get('/get-contract',[App\Http\Controllers\ContractController::class,'getContracts']);

// Route history
Route::get('/history-appointments/{userId}', [App\Http\Controllers\BookAppointmentController::class, 'show']);
Route::get('/history-apartments/{userId}', [App\Http\Controllers\BookApartController::class, 'show']);

// Route post  apartment issues
Route::post('/apartment-issues', [App\Http\Controllers\ApartmentIssueController::class, 'store']);

// Route related to user
Route::put('/update-user/{id}', [App\Http\Controllers\UserController::class,'updateUser']);
Route::get('/SeederInfo/{userId}', [App\Http\Controllers\UserController::class, 'getSeederInfo']);
Route::get('/get-user',[App\Http\Controllers\UserController::class,'getUser']);
Route::get('/get-user/{id}', [App\Http\Controllers\UserController::class,'getOneUsers']);								
Route::delete('/delete-user/{id}', [App\Http\Controllers\UserController::class,'deleteUsers']);
Route::post('login', [App\Http\Controllers\AuthController::class,'login']);
Route::post('register', [App\Http\Controllers\AuthController::class,'register']);
Route::group(['middleware'=>'api'],function(){
    Route::post('logout', [App\Http\Controllers\AuthController::class,'logout']);
    Route::post('refresh', [App\Http\Controllers\AuthController::class,'refresh']);
    Route::post('me', [App\Http\Controllers\AuthController::class,'me']);
});
Route::get('/check-email-exists/{email}', [App\Http\Controllers\AuthController::class, 'checkEmailExists']);


// Route Related to Apartments
Route::get('/get-apartments-byLessorId/{userId}', [App\Http\Controllers\ApartmentController::class, 'getApartmentByLessorId']);
Route::put('/update-apartment/{apartmentId}', [App\Http\Controllers\ApartmentController::class, 'update']);
Route::post('/add-apartment', [App\Http\Controllers\ApartmentController::class,'addApartment']);
Route::post('/add-photo', [App\Http\Controllers\ApartmentController::class,'addPhoto']);
Route::get('/get-apartment/{apartment_id}', [App\Http\Controllers\ApartmentController::class,'getOneApartments']);								
Route::get('/get-apartment',[App\Http\Controllers\ApartmentController::class,'getApartments']);					
Route::get('/search-apartment', [App\Http\Controllers\ApartmentController::class, 'search']);
Route::delete('/delete-apartments/{apartment_id}', [App\Http\Controllers\ApartmentController::class, 'deleteApartments']);
Route::get('/SeederApartmentPage/{id}', [App\Http\Controllers\ApartmentController::class, 'getSeederApartments']);
Route::delete('/delete-photo/{photoId}', [App\Http\Controllers\ApartmentController::class,'deletePhoto']);


Route::get('/get-service',[App\Http\Controllers\ServiceController::class,'getServices']);
Route::get('/get-service/{service_id}', [App\Http\Controllers\ServiceController::class,'getOneServices']);								
Route::post('/add-service',[App\Http\Controllers\ServiceController::class,'addServices']);								
Route::delete('/delete-service/{service_id}', [App\Http\Controllers\ServiceController::class,'deleteServices']);
Route::put('/edit-service/{service_id}',[App\Http\Controllers\ServiceController::class,'editServices']);