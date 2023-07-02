<?php 
namespace App\Http\Controllers;

use App\Models\apartments;
use App\Models\ratings;
use App\Models\users;
use Illuminate\Http\Request;

class starRatingController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'apartment_id' => 'required|integer',
            'user_id' => 'required|integer',
            'number_rating' => 'required|integer',
            'comment' => 'required|string',
        ]);

        $rating = ratings::create($validatedData);

        return response()->json($rating, 201);
    }

    public function getRatings(Request $request)
    {
        $apartmentId = $request->input('apartment_id');
        $userId = $request->input('user_id');

        $rating = ratings::where('apartment_id', $apartmentId)
                        ->where('user_id', $userId)
                        ->first();

        $numberOfStars = $rating ? $rating->number_rating : 0;

        return response()->json(['number_of_stars' => $numberOfStars]);
    }

    public function getRatingCountByUser($id)
    {
        $apartments = ratings::with('users')->where('apartment_id',$id)->get();
    
        return response()->json($apartments);
    }
    

}
