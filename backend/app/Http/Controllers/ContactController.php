<?php

namespace App\Http\Controllers;

use App\Mail\emailMailable;


use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function create(){
        return view('contact');
    }
    public function send(){

        request()->validate(['email'=>'required|email']);
        Mail::to(request('email'))->send(new emailMailable());
        return redirect()->back();
    }
}
