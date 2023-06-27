<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

//------sendmail------------//
Route::get("/mailsuccessfull", function(Request $request) {
    $email = $request->input('email');
    Mail::mailer('mailgun')
        ->to($email)
        ->send(new GuiEmail());
});

Route::get("/failemail", function(Request $request) {
    $email = $request->input('email');
    Mail::mailer('mailgun')
        ->to($email)
        ->send(new Failemail());
});

Route::get('/contact', [ContactController::class, 'create']);
Route::post('/contact/send', [ContactController::class, 'send'])->name('contact.send');
