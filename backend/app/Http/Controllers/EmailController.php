<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Symfony\Component\Mime\Part\TextPart;
use Symfony\Component\Mime\Header\Headers;


// use Illuminate\Support\Facades\Auth;

class EmailController extends Controller
{
    public function sendEmail(Request $request)
    {
        $email = $request->input('email');
        if (!$email) {
            return response()->json(["error" => "Email is required"], 400);
        }
    
        // $user = $request->user(); // Lấy thông tin người dùng từ request
    
        // if (!$user) {
        //     return response()->json(["error" => "User not found"], 400);
        // }
    
        try {
            $textPart = new TextPart('Email Content', 'utf-8');
            $textPart->getHeaders()->addTextHeader('Content-Type', 'text/plain');
            Mail::send([], [], function ($message) use ($email, $textPart) {
                $message->to($email)
                    ->subject('Email Subject')
                    ->setBody($textPart);
            });
    
            return response()->json(["message" => "Email sent"]);
        }   catch (\Exception $e) {
            Log::error("Failed to send email: " . $e->getMessage());
            return response()->json(["error" => "Failed to send email"], 500);
        }
    }
    
    
    
    
    
    // if (Auth::check()) {
    //     $user = Auth::user();
    //     if ($user && $user->email) {
    //         Mail::to($user->email)->send(new EmailMailable());
    //         return response()->json(["message" => "Email sent"]);
    //     } else {
    //         return response()->json(["error" => "User email not found"], 400);
    //     }
    // } else {
    //     return response()->json(["error" => "User not logged in"], 401);
    // }
}
