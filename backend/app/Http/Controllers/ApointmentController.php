<?php

namespace App\Http\Controllers;

use App\Mail\GuiEmail;
use App\Models\addresses;
use App\Models\apartments;
use App\Models\Appointments;
use App\Models\contracts;
use App\Models\users;
// use App\Models\book_apartments;						
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ApointmentController extends Controller
{
    public function getApartments()
    {
        $apartments = apartments::orderByDesc('apartment_id')->get();
        return response()->json($apartments);
    }
    public function getOneApartments($id)
    {
        $apartments = apartments::find($id);
        return response()->json($apartments);
    }


    public function addApartments(Request $request)
    {
        $apartments = new apartments();
        $apartments->user_id = intval($request->input('user_id'));
        $apartments->description = $request->input('description');
        $apartments->price = intval($request->input('price'));
        $apartments->number_room = intval($request->input('number_room'));
        $apartments->area = intval($request->input('area'));
        $apartments->address_id = intval($request->input('address_id'));
        $apartments->type_room = $request->input('type_room');
        $apartments->save();
        return $apartments;
    }
    public function deleteApartments($id)
    {
        try {
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
            if (!$apartment) {
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
return response()->json(['message' => 'Cập nhật căn hộ thành công'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi cập nhật căn hộ:' . $e->getMessage()], 500);
        }
    }


    ///------------Get Appointment----------///
    public function getAppointment($userId)
    {
        $appointments = Appointments::with('apartments', 'users')
            ->whereHas('apartments', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->join('users', 'users.id', '=', 'appointments.user_id')
            ->select('appointments.*', 'users.fullname', 'users.email')
            ->get();

        return response()->json($appointments);
    }


    public function getOneAppointment($id)
    {
        $appointments = Appointments::find($id);
        return response()->json($appointments);
    }

    //---update status---////
    public function update(Request $request, $id)
    {
        // Lấy thông tin cần cập nhật từ request
        $status = $request->input('status');

        // Cập nhật trạng thái cuộc hẹn trong cơ sở dữ liệu
        $appointment = Appointments::find($id);
        if (!$appointment) {
            return response()->json(['message' => 'Appointment not found'], 404);
        }
        $appointment->update(['status' => $status]);

        return response()->json(['message' => 'Appointment status updated successfully']);
    }
        ///=----------contract update------------///////////
        public function updateContracts(Request $request, $id)
    {
        // Lấy thông tin cần cập nhật từ request
        $contracts = $request->input('contracts');

        // Cập nhật giá trị contracts trong cơ sở dữ liệu
        $appointment = Appointments::find($id);
        if (!$appointment) {
            return response()->json(['message' => 'Appointment not found'], 404);
        }
        $appointment->update(['contracts' => $contracts]);

        return response()->json(['message' => 'Contracts updated successfully']);
    }



    //---------- lấy địa chỉ-------//
    public function getAddress()
    {
        $addresses = addresses::all();
        return response()->json($addresses);
    }
    public function getOneAddress($id)
    {
        $addresses = addresses::find($id);
        return response()->json($addresses);
    }



    // public function senMail(){
    //     Mail::to(request(['email']))->send(new GuiEmail());
    // }

    //-------get contracs----//
    public function getContracts($userId)
    {
        $contracts = contracts::with('apartment', 'user')
            ->whereHas('apartment', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
          
            ->get();
        return response()->json($contracts);
    }

    public function getaddContracts()
    {
        $contracts = Appointments::all();
        return response()->json($contracts);
    }


    public function getOneContracts($id)
    {
        $contracts = contracts::find($id);
        return response()->json($contracts);
    }

    public function addContracts(Request $request)
    {
        $contracts = new contracts;
        $contracts->user_id = intval($request->input('user_id'));
        $contracts->apartment_id = intval($request->input('apartment_id'));
        $contracts->start_date = $request->input('start_date');
        $contracts->end_date = $request->input('end_date');
        $contracts->save();
        return $contracts;
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
}