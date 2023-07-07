<?php

namespace App\Http\Controllers;

use App\Models\apartmentIssue;
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
            'check_in_date' => 'required|date|after:today',
            'check_out_date' => 'required|date|after:check_in_date|before_or_equal:'.now()->addDays(15)->format('Y-m-d'),
        ]);
    
        // Get the apartment price
        $apartment = Apartments::find($validatedData['apartment_id']); // Replace with your actual logic to retrieve the apartment
        $price = $apartment->price;
    
        // Calculate the number of days
        $checkInDate = \Carbon\Carbon::createFromFormat('Y-m-d', $validatedData['check_in_date']);
        $checkOutDate = \Carbon\Carbon::createFromFormat('Y-m-d', $validatedData['check_out_date']);
        $days = $checkOutDate->diffInDays($checkInDate);
    
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
    
    public function show($userId)
    {
        $book_apartment = book_apartments::with(['apartments', 'apartments.apartmentImage'])
            ->where('user_id', $userId)
            ->get();
    
        if ($book_apartment->isEmpty()) {
            return response()->json(['error' => 'Appointment not found'], 404);
        }
    
        return response()->json($book_apartment);
    }
    ///------------Get Bookapartment----------///
    public function getBookapartment($userId)
    {
        $bookapartment = book_apartments::with('apartments', 'users')
            ->whereHas('apartments', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->join('users', 'users.id', '=', 'book_apartments.user_id')
            ->select('book_apartments.*', 'users.fullname', 'users.email')
            ->get();

        return response()->json($bookapartment);
    }

    public function deletebookapartment($id)
    {
        try {
            book_apartments::findOrFail($id)->delete();  
            return response()->json(['message' => 'Xóa căn hộ đã đặt thành công'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi xóa căn hộ: ' . $e->getMessage()], 500);
        }
    }



    
}
