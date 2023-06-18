<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\apartments;

use Illuminate\Support\Facades\DB;

class UpdateApartmentsSeeder extends Seeder
{
    public function run()
    {
        $faker = \Faker\Factory::create();

        DB::table('apartments')
            ->where('type_room', 'Phòng ngắn hạn')
            ->update(['price' => $faker->numberBetween(1000000, 4000000)]);
    }
}