<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\apartmentIssue;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class ApartmentIssueController extends Controller
{
    //


// ...

public function store(Request $request)
{
    try {
        $data = $request->validate([
            'apartment_id' => 'required',
            'user_id' => 'required',
            'description' => 'required',
        ]);

        $apartmentIssue = new apartmentIssue();
        $apartmentIssue->user_id = $data['user_id'];
        $apartmentIssue->apartment_id = $data['apartment_id'];
        $apartmentIssue->description = $data['description'];
        $apartmentIssue->report_date = Carbon::now(); 
        $apartmentIssue->resolved = 'Chờ giải quyết';
        $apartmentIssue->save();

        return response()->json($apartmentIssue, 201);
    } catch (\Exception $ex) {
        return response()->json(['error' => $ex], 500);
    }
}

///------------Get apartmentIssue----------///
public function getApartmentissue($userId)
{
    $issues = apartmentIssue::with('apartments', 'users')
        ->whereHas('apartments', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })
        ->get();

    return response()->json($issues);
}

//---update status---////
public function confirmIssue(Request $request, $id)
{
    // Lấy thông tin cần cập nhật từ request
    $resolved = $request->input('resolved');

    // Cập nhật trạng thái cuộc hẹn trong cơ sở dữ liệu
    $issue = apartmentIssue::find($id);
    if (!$issue) {
        return response()->json(['message' => 'Appointment not found'], 404);
    }
    $issue->update(['resolved' => $resolved]);

    return response()->json(['message' => 'Appointment status updated successfully']);
}

}
