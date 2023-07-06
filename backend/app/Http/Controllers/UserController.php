<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\users;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    //
    public function updateUser(Request $request, $id)
{
    try {
        $user = users::findOrFail($id);
        $user->status = $request->input('status', 'Active');
        $user->save();
        return response()->json(['message' => 'Cập nhật trạng thái thành công']);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Đã xảy ra lỗi khi cập nhật trạng thái'], 500);
    }
}

public function getUser()							
{							
$users = users::all();							
return response()->json($users);							
}							
public function getOneUsers($id)							
{							
$users = users::find($id);							
return response()->json($users);							
}	



public function getSeederInfo($userId)
{
    $seederInfo = users::findOrFail($userId);
    return response()->json($seederInfo);
}

public function updateProfile(Request $request)
    {
        $user = Auth::users();
        
        $validatedData = $request->validate([
            'username' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|string',
            'birthday' => 'required|date',
            'address' => 'required|string',
            'password' => 'nullable|string|min:8|confirmed',
            'role' => 'required|string',
        ]);
        
        $user->username = $validatedData['username'];
        $user->email = $validatedData['email'];
        $user->phone = $validatedData['phone'];
        $user->birthday = $validatedData['birthday'];
        $user->address = $validatedData['address'];
        if (!empty($validatedData['password'])) {
            $user->password = Hash::make($validatedData['password']);
        }
        $user->role = $validatedData['role'];
        
        $user->save();
        
        return response()->json(['message' => 'Profile updated successfully'], 200);
    }
}

