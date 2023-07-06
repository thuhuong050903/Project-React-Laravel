<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
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
    $credentials = request(['email', 'password', 'status']);

    if (empty($credentials['email']) || empty($credentials['password'])) {
        return response()->json(['error' => 'Email and password are required'], 400);
    }

    // Kiểm tra xem người dùng đã nhập dữ liệu hay chưa
    if (empty($credentials['email']) || empty($credentials['password'])) {
        return response()->json(['error' => 'Please enter your email and password'], 400);
    }

    // Tìm kiếm người dùng theo email
    $user = users::where('email', $credentials['email'])->first();

    if (!$user) {
        return response()->json(['error' => 'Email is not registered'], 401);
    }

    // Kiểm tra xem mật khẩu đã nhập có khớp với mật khẩu của người dùng hay không
    if (!Hash::check($credentials['password'], $user->password)) {
        return response()->json(['error' => 'Incorrect password'], 401);
    }
    if (! $token = auth()->attempt($credentials)) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    $user = auth()->user();
    $role = $user->role; // Retrieve the role of the authenticated user

    return $this->respondWithToken($token, $role);
}


    public function register()
    {
        $validator = Validator::make(request()->all(), [
            'username' => 'required|unique:users',
            'fullname' => 'required',
            'email' => 'required|email|unique:users',
            'phone' => 'required',
            'address' => 'required',
            'password' => 'required|min:8',
            'birthday' => 'required|date|before:today|before:-16 years',
            'role' => 'required',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
    
        $credentials = $validator->validated();
        $credentials['password'] = bcrypt($credentials['password']);
        $credentials['status'] = 'Active'; // Thêm trường status với giá trị Active
    
        // Kiểm tra email đã được sử dụng chưa
        $existingUsers = users::where('email', $credentials['email'])->get();
        $numExistingUsers = $existingUsers->count();
        if ($numExistingUsers === 1) {
            // Nếu chỉ có một người dùng với email này, kiểm tra vai trò của người dùng
            $existingUser = $existingUsers->first();
            if ($existingUser->role == $credentials['role']) {
                return response()->json(['message' => 'Email has already been taken.'], 400);
            }
        } elseif ($numExistingUsers > 1) {
            // Nếu có nhiều hơn một người dùng với email này, kiểm tra từng người dùng
            foreach ($existingUsers as $existingUser) {
                if ($existingUser->role == $credentials['role']) {
                    return response()->json(['message' => 'Email has already been taken.'], 400);
                }
            }
        }
    
        // Tạo người dùng mới
        $user = users::create($credentials);
    
        // Tạo mã xác nhận duy nhất cho người dùng
        $verificationToken = sha1($user->email . time());
    
        // Gửi email xác nhận
        Mail::to($user->email)->send(new RegistrationConfirmation($verificationToken));
    
        // Trả về phản hồi thành công
        return response()->json(['message' => 'Registration successful. Please check your email for verification.'], 201);
        // Trả về lỗi nếu không thành công
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
    

    public function checkEmailExists($email)
    {
        $user = \App\Models\users::where('email', $email)->first();

        if ($user) {
            return response()->json(['exists' => true, 'user' => $user]);
        } else {
            return response()->json(['exists' => false, 'user' => null]);
        }
    }

}