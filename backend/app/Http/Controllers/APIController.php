<?php													
namespace App\Http\Controllers;
use App\Models\addresses;
use App\Models\apartments;	
use App\Models\users;
use App\Models\book_apartments;						
use Illuminate\Http\Request;							
use Illuminate\Support\Facades\File;	
use App\Models\apartmentImages;												
class APIController extends Controller							
{							
public function getApartments()							
{							
    $apartments = Apartments::with([
        'apartmentImage' => function ($query) {
            $query->select('apartment_id', 'name');
        },
        'addresses' => function ($query) {
            $query->select('address_id', 'number', 'street', 'ward', 'district');
        }
    ])->get();
return response()->json($apartments);							
}							
public function getOneApartments($id)							
{							
    $apartment = Apartments::with([
        'apartmentImage' => function ($query) {
            $query->select('apartment_id', 'name');
        },
        'users' => function ($query) {
            $query->select('id', 'username');
        },
        'addresses' => function ($query) {
            $query->select('address_id', 'number', 'street', 'ward', 'district');
        },
        'services' => function ($query) use ($id) {
            $query->select('services.service_id', 'services.description')
                ->join('service_apartment as sa', 'services.service_id', '=', 'sa.service_id')
                ->where('sa.apartment_id', $id);
        }
        
    ])->find($id);

    return response()->json($apartment);							
}							
public function addApartments(Request $request)							
{							
$apartments = new apartments();							
// $apartments->name = $request->input('name');							
// $apartments->image = $request->input('image');	
$apartments->user_id = intval($request->input('user_id'));						
$apartments->description = $request->input('description');							
$apartments->price = intval($request->input('price'));													
$apartments->number_room = intval($request->input('number_room'));							
$apartments->area = intval($request->input('area'));	
$apartments->address_id = intval($request->input('address_id'));	
$apartments-> type_room = $request->input('type_room');		
$apartments->save();							
return $apartments;							
}							
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
public function editApartments(Request $request, $id)
{
    try {
        $apartment = apartments::find($id);
        if (!$apartment){
            return response()->json(['message' => 'Căn hộ không tồn tại'], 404);
        }
        $apartment->user_id = intval($request->input('user_id'));
        $apartment->description = $request->input('description');
        $apartment->price = intval($request->input('price'));
        $apartment->number_room = intval($request->input('number_room'));
        $apartment->area = intval($request->input('area'));
        $apartment->address_id = intval($request->input('address_id'));
        $apartment->type_room = $request->input('type_room');
        $apartment->save();
        return response()->json(['message'=>'Cập nhật căn hộ thành công'],200);
    } catch (\Exception $e) {
        return response()->json(['message'=>'Đã xảy ra lỗi khi cập nhật căn hộ:'. $e->getMessage()], 500);
    }
}
				
							
// public function uploadImage(Request $request)							
// {							
// // process image							
// if ($request->hasFile('uploadImage')) {							
// $file = $request->file('uploadImage');							
// $fileName = $file->getClientOriginalName();							
							
// $file->move('source/image/product', $fileName);							
							
// return response()->json(["message" => "ok"]);							
// } else return response()->json(["message" => "false"]);							
// }	





// address



public function getAddresses()							
{							
$addresses = addresses::all();							
return response()->json($addresses);							
}							
public function getOneAddresses($id)							
{							
$addresses = addresses::find($id);							
return response()->json($addresses);							
}							
public function addAddresses(Request $request)							
{							
$addresses = new addresses();							
// $apartments->name = $request->input('name');							
// $apartments->image = $request->input('image');	
$addresses->number = intval($request->input('number'));						
$addresses->street = $request->input('street');							
$addresses->ward = $request->input('ward');													
$addresses->district = $request->input('district');							

$addresses->save();							
return $addresses;							
}							

public function deleteAddresses($id)
{
    try {
        
        // Xóa địa chỉ
        addresses::findOrFail($id)->delete();
        return response()->json(['message' => 'Xóa địa chỉ thành công'], 200);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Đã xảy ra lỗi khi xóa địa chỉ: ' . $e->getMessage()], 500);
    }
}
public function editAddresses(Request $request, $id)
{
    try {
        $address = addresses::find($id);
        if (!$address) {
            return response()->json(['message' => 'Địa chỉ không tồn tại'], 404);
        }
        $address->number = intval($request->input('number'));
        $address->street = $request->input('street');
        $address->ward = $request->input('ward');
        $address->district = $request->input('district');
        $address->save();
        return response()->json(['message'=>'Cập nhật địa chỉ thành công'],200);
    } catch (\Exception $e) {
        return response()->json(['message'=>'Đã xảy ra lỗi khi cập nhật địa chỉ:'. $e->getMessage()], 500);
    }
}










// user

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

public function deleteUsers($id)
{
    try {
         users::findOrFail($id)->apartmentIssue()->delete();
         users::findOrFail($id)->apartment()->delete();
         users::findOrFail($id)->contract()->delete();
         users::findOrFail($id)->book_Apartment()->delete();
         users::findOrFail($id)->rating()->delete();
         users::findOrFail($id)->appointment()->delete();
        // Xóa người dùng
        users::findOrFail($id)->delete();
        return response()->json(['message' => 'Xóa người dùng thành công'], 200);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Đã xảy ra lỗi khi xóa người dùng: ' . $e->getMessage()], 500);
    }
}





//image


















// seeder



}							
							
							
							