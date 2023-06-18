<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;
use App\Models\contracts;
use App\Models\apartments;
use App\Models\users;
use Faker\Factory as Faker;
use Carbon\Carbon;


class ContractSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        $apartments = apartments::where('type_room', 'Phòng dài hạn')->get();

        $users = users::where('role', 'Người thuê')->pluck('id');
    
        foreach ($apartments as $apartment) {
            $user_id = $faker->randomElement($users);
    
            $startOfYear = Carbon::create(2022, 1, 1)->startOfDay();
            $endOfYear = Carbon::create(2028, 12, 31)->endOfDay();
            
            $startDate = Carbon::createFromFormat('Y-m-d', $faker->dateTimeBetween($startOfYear, $endOfYear)->format('Y-m-d'));
            $endDate = Carbon::createFromFormat('Y-m-d', $faker->dateTimeBetween($startDate, $endOfYear)->format('Y-m-d'));
            
            
            
            contracts::create([
                'user_id' => $user_id,
                'apartment_id' => $apartment->apartment_id,
                'start_date' => $startDate,
                'end_date' => $endDate,
              
            ]);
        }
        
    }
}
