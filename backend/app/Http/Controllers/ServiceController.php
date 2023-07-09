<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\services;
class ServiceController extends Controller
{
    public function getServices()							
    {							
    $services = services::all();							
    return response()->json($services);							
    }					
    public function getOneServices($id)
    {
        $service = services::select('service_id', 'description', 'price', 'contact_info')
            ->find($id);
    
        return response()->json($service);
    }
                        
public function addServices(Request $request)							
{							
$services = new services();							
// $apartments->name = $request->input('name');							
// $apartments->image = $request->input('image');	
$services->service_id = intval($request->input('service_id'));						
$services->description = $request->input('description');							
$services->price = intval($request->input('price'));													
$services->contact_info = intval($request->input('contact_info'));							

$services->save();							
return $services;							
}							
public function deleteServices($id)
{
    try {
        // Xóa các bản ghi trong bảng apartment_images liên quan đến căn hộ
        services::findOrFail($id)->service_apartment()->delete();
        // services::findOrFail($id)->apartmentIssues()->delete();
        
        // Xóa dịch vụ
        services::findOrFail($id)->delete();
        return response()->json(['message' => 'Xóa dịch vụ thành công'], 200);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Đã xảy ra lỗi khi xóa dịch vụ: ' . $e->getMessage()], 500);
    }
}
public function editServices(Request $request, $id)
{
    try {
        $service = services::find($id);
        if (! $service){
            return response()->json(['message' => 'Dịch vụ không tồn tại'], 404);
        }
       
        $service->description = $request->input('description');
        $service->price = intval($request->input('price'));
        $service->contact_info = ($request->input('contact_info'));
        
        $service->save();
        return response()->json(['message'=>'Cập nhật dịch vụ thành công'],200);
    } catch (\Exception $e) {
        return response()->json(['message'=>'Đã xảy ra lỗi khi cập nhật dịch vụ:'. $e->getMessage()], 500);
    }
}
}