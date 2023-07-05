<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\apartments;
use App\Models\Images;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ApartmentController extends Controller
{
    // Thêm apartment 
    
    public function addApartment(Request $request)
    {
        // Lưu thông tin căn hộ vào bảng apartments
        $apartment = new apartments;
        $apartment->user_id = $request->input('user_id');
        $apartment->description = $request->input('description');
        $apartment->price = $request->input('price');
        $apartment->number_room = $request->input('number_room');
        $apartment->area = $request->input('area');
        $apartment->type_room = $request->input('type_room');
        $apartment->number_address = $request->input('number_address');
        $apartment->street = $request->input('street');
        $apartment->ward = $request->input('ward');
        $apartment->district = $request->input('district');
        $apartment->save();
    
        return response()->json(['message' => 'Apartment added successfully'], 200);
    }
    
  
// Thêm ảnh cho apartment đó
    public function addPhoto(Request $request) {
        $response = [];
 
        $validator = Validator::make($request->all(),
            [
                'images' => 'required',
                'images.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048'
            ]
        );
 
        if($validator->fails()) {
            return response()->json(["status" => "failed", "message" => "Validation error", "errors" => $validator->errors()]);
        }
        $lastApartment = apartments::latest('apartment_id')->first();
        $lastApartmentId = $lastApartment->apartment_id;

        if($request->has('images')) {
            foreach($request->file('images') as $image) {
                $filename = $image->getClientOriginalName();
                $image->move('uploads/', $filename);

                Images::create([
                    "apartment_id" => $lastApartmentId,
                    'name' => $filename
                ]);
            }
 
            $response["status"] = "successs";
            $response["message"] = "Success! image(s) uploaded";
        }
 
        else {
            $response["status"] = "failed";
            $response["message"] = "Failed! image(s) not uploaded";
        }
        return response()->json($response);
    }

    // Lấy id cuối cùng của bảng apartments để thêm ảnh
    public function getLastApartmentId()
    {
        $lastApartment = apartments::latest()->first(); // Lấy căn hộ cuối cùng
        $apartmentId = $lastApartment ? $lastApartment->apartment_id : null; // Lấy id của căn hộ cuối cùng

        return response()->json(['id' => $apartmentId], 200);
    }

    // lấy dữ liệu căn hộ của một chủ sở hữu
    public function getApartmentByLessorId($userId)
    {
        $apartments = apartments::with('apartmentImage')
            ->where('user_id', $userId)
            ->get();

        return response()->json($apartments);
    }

    // Hàm sửa căn hộ
    public function update(Request $request, $apartmentId)
    {
        try {
            $apartment = apartments::findOrFail($apartmentId);

            // Cập nhật thông tin căn hộ
            $apartment->description = $request->input('description');
            $apartment->price = $request->input('price');
            $apartment->number_room = $request->input('number_room');
            $apartment->area = $request->input('area');
            $apartment->type_room = $request->input('type_room');
            $apartment->number_address = $request->input('number_address');
            $apartment->street = $request->input('street');
            $apartment->ward = $request->input('ward');
            $apartment->district = $request->input('district');

            $apartment->save();
            return response()->json(['message' => $apartment]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // Lấy dữ liệu của 1 căn hộ

    public function getOneApartments($id)
{
    $apartment = Apartments::with([
        'apartmentImage' => function ($query) {
            $query->select('image_id','apartment_id', 'name');
        },
        'users',
        'service_apartment' => function ($query) {
            $query->with('services');
        }
    ])->find($id);
    return response()->json($apartment);
}
		
// Xóa ảnh căn hộ khi chỉnh sửa
public function deletePhoto($photoId)
{
    try {
        // Tìm kiếm ảnh căn hộ theo photoId
        $apartmentImage = Images::find($photoId);

        if (!$apartmentImage) {
            return response()->json(['message' => 'Không tìm thấy ảnh căn hộ'], 404);
        }

        // Xóa ảnh căn hộ khỏi cơ sở dữ liệu
        $apartmentImage->delete();

        return response()->json(['message' => 'Xóa ảnh căn hộ thành công'], 200);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Đã xảy ra lỗi khi xóa ảnh căn hộ'], 500);
    }
}

// Tìm kiếm căn hộ
public function search(Request $request)
    {
        $district = $request->query('district');
        $numRooms = $request->query('numRooms');

        $apartments = apartments::where('district', $district)
            ->where('number_room', $numRooms)
            ->get();

        return response()->json($apartments);
    }
}
