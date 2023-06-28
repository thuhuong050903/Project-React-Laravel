<?php

namespace App\Http\Controllers;

use App\Models\Appointments;
use Illuminate\Http\Request;

class BookAppointmentController extends Controller
{
    //
    public function store(Request $request)
    {
        try {
            $data = $request->validate([
                'user_id' => 'required',
                'apartment_id' => 'required',
                'desired_rent' => 'required',
                'desired_move_in_date' => 'required|date',
                'appointment_date_time' => 'required|date',
            ]);
    
            $booking = new Appointments();
            $booking->user_id = $data['user_id'];
            $booking->apartment_id = $data['apartment_id'];
    
            $booking->desired_rent= $data['desired_rent'];
            $booking->desired_move_in_date = $data['desired_move_in_date'];
            $booking->appointment_date_time = $data['appointment_date_time'];
            $booking->status = 'Chờ xác nhận';
            $booking->save();
        
            return response()->json($booking, 201);
        } catch (\Exception $ex) {
            return response()->json(['error' => $ex], 500);
        }
    }
    
    public function show($userId)
    {
        $appointment = Appointments::with('apartments')->where('user_id', $userId)->first();

        if (!$appointment) {
            return response()->json(['error' => 'Appointment not found'], 404);
        }

        return response()->json($appointment);
    }
    

}
