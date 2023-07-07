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
        $apartmentIssue->resolved = 'Chờ xác nhận';
        $apartmentIssue->save();

        return response()->json($apartmentIssue, 201);
    } catch (\Exception $ex) {
        return response()->json(['error' => $ex], 500);
    }
}


}
