<?php

namespace App\Http\Controllers;

use App\Mail\EmailMailable;
use App\Http\Controllers\BaseController;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;

class EmailController extends BaseController
{
    public function sendEmail()
    {
        Mail::to(Auth::user()->email)->send(new EmailMailable());
        return $this->sendResponse("Email sent");
    }
}
