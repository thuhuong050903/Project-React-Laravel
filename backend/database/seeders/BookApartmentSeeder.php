<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\book_apartments;
use App\Models\apartments;
use App\Models\users;
use Faker\Factory as Faker;
use Carbon\Carbon;

class BookApartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
{
    $faker = Faker::create();
    $apartments = apartments::where('type_room', 'Phòng ngắn hạn')->get();

    $users = users::where('role', 'Người thuê')->pluck('id');

    foreach ($apartments as $apartment) {
        $status = $faker->randomElement(['Chưa thanh toán', 'Đã thanh toán']);
        $user_id = $faker->randomElement($users);

        $startOfYear = Carbon::create(2023, 1, 1)->startOfDay();
        $endOfYear = Carbon::create(2023, 12, 31)->endOfDay();
        
        $checkInDate = Carbon::createFromFormat('Y-m-d', $faker->dateTimeBetween($startOfYear, $endOfYear)->format('Y-m-d'));
        $checkOutDate = $checkInDate->copy()->addDays($faker->numberBetween(1, 30));
        
        $price = $apartment->price;
        
        $days = $checkInDate->diffInDays($checkOutDate);
        

        $totalPrice = $price * $days;

        book_apartments::create([
            'user_id' => $user_id,
            'apartment_id' => $apartment->apartment_id,
            'check_in_date' => $checkInDate,
            'check_out_date' => $checkOutDate,
            'total_price' => $totalPrice,
            'status' => $status,
        ]);
    }
}
}
