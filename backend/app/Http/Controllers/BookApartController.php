<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\book_apartments;
use App\Models\apartments;

class BookApartController extends Controller
{
    //
    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'user_id' => 'required',
            'phone' => 'required',
            'apartment_id' => 'required',
            'check_in_date' => 'required|date',
            'check_out_date' => 'required|date'
        ]);
    $apartment_id = ($validatedData['apartment_id']);
        // Calculate the number of days
        $check_in_date = new \DateTime($validatedData['check_in_date']);
        $check_out_date = new \DateTime($validatedData['check_out_date']);
        $days = $check_out_date->diff($check_in_date)->days;
    
        // Get the apartment price
        $apartment = Apartments::find($apartment_id); // Replace with your actual logic to retrieve the apartment
        $price = $apartment->price;
    
        // Calculate the total amount
        $totalAmount = $days * $price;
    
        // Create a new booking
        $booking = new book_apartments();
        $booking->user_id = $validatedData['user_id'];
        $booking->apartment_id = $validatedData['apartment_id'];

        $booking->phone = $validatedData['phone'];
        $booking->check_in_date = $validatedData['check_in_date'];
        $booking->check_out_date = $validatedData['check_out_date'];
        $booking->total_price = $totalAmount;
        $booking->status = 'Chờ xác nhận';
        $booking->save();
    
        // Return the created booking as JSON response
        return response()->json($booking, 201);
    }
    
}
