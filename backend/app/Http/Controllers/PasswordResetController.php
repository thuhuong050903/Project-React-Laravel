<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use App\Models\users;
use Illuminate\Support\Facades\Hash;
class PasswordResetController extends Controller
{
    public function sendResetLink(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $user = users::where('email', $request->email)->first();
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

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
            'newPassword_confirmation' => 'required|string|min:8|same:newPassword',
        ]);

        $status = Password::updatePassword($request->only(
            'email', 'verificationCode', 'newPassword', 'newPassword_confirmation'
        ));

        return $status === Password::PASSWORD_RESET
            ? response()->json(['message' => 'Password reset successfully'])
            : response()->json(['message' => 'Unable to reset password'], 500);
    }
    public function reset(Request $request  , $token, $email)
{
    $request->validate([
        'email' => 'required|email',
        'verificationCode' => 'required|string',
        'newPassword' => 'required|string|min:8',
        'newPassword_confirmation' => 'required|string|min:8|same:newPassword',
    ]);

    $email = urldecode($email);
    if (! $request->hasValidSignature() || ! $email || ! $token) {
        abort(403);
    }

    // Show the password reset form
    return view('password.reset', [
        'email' => $email,
        'resetCode' => $token,
    ]);
    // Kiểm tra mã xác thực
    // if (!$user->verifyResetCode($request->verificationCode)) {
    //     return response()->json(['message' => 'Invalid verification code'], 400);
    // }

    // Show the password reset form
    // return view('password.reset', [
    //     'email' => $request->email,
    //     'resetCode' => $request->verificationCode,
    // ]);
}

}
