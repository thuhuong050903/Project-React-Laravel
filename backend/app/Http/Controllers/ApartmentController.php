<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\apartmentImage;
use App\Models\apartments;
use App\Models\Images;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ApartmentController extends Controller
{
    // Thêm apartment 
    
    public function addApartment(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'user_id' => 'required',
            'description' => 'required',
            'price' => 'required',
            'number_room' => 'required',
            'area' => 'required',
            'type_room' => "required",
            'number_address' => 'required',
            'street' => 'required',
            'ward' => 'required',
            'district' => 'required',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:2048' // Kiểm tra các trường ảnh
        ]);

        // Tạo một đối tượng căn hộ mới
        $apartment = new apartments();
        $apartment->user_id = $validatedData['user_id'];
        $apartment->description = $validatedData['description'];
        $apartment->price = $validatedData['price'];
        $apartment->number_room = $validatedData['number_room'];
        $apartment->area = $validatedData['area'];
        $apartment->type_room = $validatedData['type_room'];
        $apartment->number_address = $validatedData['number_address'];
        $apartment->street = $validatedData['street'];
        $apartment->ward = $validatedData['ward'];
        $apartment->district = $validatedData['district'];



        // Lưu căn hộ vào cơ sở dữ liệu
        $apartment->save();

        // Lưu các ảnh liên quan đến căn hộ
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $imageName = time() . '_' . $image->getClientOriginalName();
                $image->move('uploads/', $imageName);

                // Tạo một đối tượng ảnh căn hộ mới
                $apartmentImage = new apartmentImage();
                $apartmentImage->apartment_id = $apartment->apartment_id;
                $apartmentImage->name = $imageName;

                // Lưu ảnh căn hộ vào cơ sở dữ liệu
                $apartmentImage->save();
            }
        }

        return response()->json(['message' => 'Apartment added successfully'], 201);
    }
    
    
  
// Thêm ảnh cho apartment đó
    public function addPhoto(Request $request, $apartment_id) {
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

        if($request->has('images')) {
            foreach($request->file('images') as $image) {
                $filename = $image->getClientOriginalName();
                $image->move('uploads/', $filename);

                Images::create([
                    "apartment_id" => $apartment_id,
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



    // lấy dữ liệu căn hộ của một chủ sở hữu
    public function getApartmentByLessorId($userId)
    {
        $apartments = apartments::with(['apartmentImage', 'users'])
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

//Lấy tất cả căn hộ
    public function getApartments()							
{							
    $apartments = Apartments::with(
        ['apartmentImage','users' ]
    )->get();
return response()->json($apartments);							
}	

// Xóa apartments
public function deleteApartments($id)
{
    try {
        // Xóa các bản ghi trong bảng apartment_images liên quan đến căn hộ
        apartments::findOrFail($id)->apartmentImage()->delete();
        apartments::findOrFail($id)->apartmentIssues()->delete();
        apartments::findOrFail($id)->contracts()->delete();
        apartments::findOrFail($id)->book_Apartments()->delete();
        apartments::findOrFail($id)->ratings()->delete();
        apartments::findOrFail($id)->service_Apartment()->delete();
        apartments::findOrFail($id)->appointments()->delete();
        // Xóa căn hộ
        apartments::findOrFail($id)->delete();
        return response()->json(['message' => 'Xóa căn hộ thành công'], 200);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Đã xảy ra lỗi khi xóa căn hộ: ' . $e->getMessage()], 500);
    }
}

}