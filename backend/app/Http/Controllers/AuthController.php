<?php

namespace App\Http\Controllers;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\users;
use Illuminate\Support\Facades\Mail;
use App\Mail\RegistrationConfirmation;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','register']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    public function register()
    {
        $credentials = request(['username','fullname','email','phone','address', 'password','birthday','role']);
        $credentials['password'] = bcrypt($credentials['password']);
        users::create($credentials);
        

        $user = users::where('email', request(['email']))->first();

        // Tạo mã xác nhận duy nhất cho người dùng
        $verificationToken = sha1($user->email . time());
    
        // // Lưu mã xác nhận vào bảng users
        // $user->verification_token = $verificationToken;
        // $user->save();
    
        // // Xây dựng liên kết xác nhận
        // $verificationLink = route('email.verify', ['token' => $verificationToken]);
    
        // Gửi email xác nhận
        Mail::to(request(['email']))->send(new RegistrationConfirmation($verificationToken));
    
        // Trả về phản hồi thành công
        return response()->json(['message' => 'Registration successful. Please check your email for verification.',], 201);
       // tra ve loi neu khoong thanh cong
    }



//     public function verifyEmail(Request $request)
// {
//     $token = $request->input('token');

//     $user = users::where('verification_token', $token)->first();

//     if ($user) {
//         // Cập nhật trạng thái xác nhận của người dùng
//         $user->email_verified = true;
//         $user->verification_token = null;
//         $user->save();

//         // Chuyển hướng người dùng đến trang xác nhận thành công
//         return redirect()->route('email.verified');
//     }

//     // Chuyển hướng người dùng đến trang xác nhận không hợp lệ
//     return redirect()->route('email.invalid');
// }


    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
{
    try {
        $newToken = JWTAuth::refresh(JWTAuth::getToken());

        return $this->respondWithToken($newToken);
    } catch (JWTException $e) {
        return response()->json(['error' => 'Failed to refresh token'], 401);
    }
}

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
{
    $expiration = JWTAuth::factory()->getTTL() * 60; // Expiration time in seconds

    return response()->json([
        'access_token' => $token,
        'token_type' => 'bearer',
        'expires_in' => $expiration,
        'user' => auth()->user()
    ]);
}

}