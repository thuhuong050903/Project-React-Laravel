<?php

namespace App\Http\Controllers;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\users;
use App\Models\admin;
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
    
        $user = auth()->user();
        $role = $user->role; // Retrieve the role of the authenticated user
    
        return $this->respondWithToken($token, $role);
    }

    public function register()
    {
        $credentials = request(['username','fullname','email','phone','address', 'password','birthday','role']);
        $credentials['password'] = bcrypt($credentials['password']);
        users::create($credentials);
        

        $user = users::where('email', request(['email']))->first();

        // Tạo mã xác nhận duy nhất cho người dùng
        $verificationToken = sha1($user->email . time());
    
       
    
        // Gửi email xác nhận
        Mail::to(request(['email']))->send(new RegistrationConfirmation($verificationToken));
    
        // Trả về phản hồi thành công
        return response()->json(['message' => 'Registration successful. Please check your email for verification.',], 201);
       // tra ve loi neu khoong thanh cong
    }





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
        $role = auth()->user()->role; // Retrieve the role of the authenticated user
    
        return $this->respondWithToken($newToken, $role);
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
    protected function respondWithToken($token, $role)
    {
        $expiration = JWTAuth::factory()->getTTL() * 60; // Expiration time in seconds
    
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'role' => $role, // Include the role in the response
            'expires_in' => $expiration,
            'user' => auth()->user()
        ]);
    }
    

}