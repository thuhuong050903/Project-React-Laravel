<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;

class PasswordResetController extends Controller
{
    public function sendResetLink(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $status = Password::sendResetLink($request->only('email'));

        return $status === Password::RESET_LINK_SENT
            ? response()->json(['message' => 'Reset link sent successfully'])
            : response()->json(['message' => 'Unable to send reset link'], 500);
    }

    public function confirmPasswordReset(Request $request)
    {
        $request->validate([
            'verificationCode' => 'required|string',
            'newPassword' => 'required|string|min:8',
        ]);

        $status = Password::reset($request->only(
            'verificationCode', 'newPassword', 'newPassword_confirmation'
        ), function ($user, $password) {
            $user->forceFill([
                'password' => $password,
                'remember_token' => \Illuminate\Support\Str::random(60),
            ])->save();
        });

        return $status === Password::PASSWORD_RESET
            ? response()->json(['message' => 'Password reset successfully'])
            : response()->json(['message' => 'Unable to reset password'], 500);
    }
}
