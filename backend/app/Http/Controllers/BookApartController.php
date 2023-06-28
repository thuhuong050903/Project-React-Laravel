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


        // Get the apartment price
        $apartment = Apartments::find($apartment_id); // Replace with your actual logic to retrieve the apartment
        $price = $apartment->price;

        // Calculate the total amount
        $checkInDate = \Carbon\Carbon::createFromFormat('Y-m-d', $validatedData['check_in_date']);
        $checkOutDate = \Carbon\Carbon::createFromFormat('Y-m-d', $validatedData['check_out_date']);
        $days = $checkOutDate->diffInDays($checkInDate);

        $totalAmount = $days * $price;

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

    public function show($userId)
    {
        $book_apartment = book_apartments::with('apartments')->where('user_id', $userId)->first();

        if (!$book_apartment) {
            return response()->json(['error' => 'Appointment not found'], 404);
        }

        return response()->json($book_apartment);
    }
}
