<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\book_apartments;
use App\Models\ratings;

class RatingSeeder extends Seeder
{
    public function run()
    {
        $bookings = book_apartments::all();

        foreach ($bookings as $booking) {
           ratings::create([
                'apartment_id' => $booking->apartment_id,
                'user_id' => $booking->user_id,
                'number_rating' => rand(1, 5),
                'comment' => 'Lorem ipsum dolor sit amet.',
            ]);

           
        }
    }
}