<?php

namespace App\Http\Controllers;

use App\Models\Appointments;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BookAppointmentController extends Controller
{
    //
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required',
            'apartment_id' => 'required',
            'desired_rent' => 'required',
            'desired_move_in_date' => 'required|date|after:today',
            'appointment_date_time' => 'required|date|before:desired_move_in_date',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
    
        try {
            // Create a new long-term booking
            $booking = new Appointments();
            $booking->user_id = $request->input('user_id');
            $booking->apartment_id = $request->input('apartment_id');
            $booking->desired_rent = $request->input('desired_rent');
            $booking->desired_move_in_date = $request->input('desired_move_in_date');
            $booking->appointment_date_time = $request->input('appointment_date_time');
            $booking->status = 'Chờ xác nhận';
            $booking->admin_confirm = '';

            $booking->save();
    
            return response()->json($booking, 201);
        } catch (\Exception $ex) {
            return response()->json(['error' => $ex], 500);
        }
    }
    
    
    
    public function show($userId)
    {
        $appointment = Appointments::with('apartments', 'apartments.apartmentImage')->where('user_id', $userId)->get();

        if (!$appointment) {
            return response()->json(['error' => 'Appointment not found'], 404);
        }

        return response()->json($appointment);
    }
    

}
