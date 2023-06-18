<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Models\Appointment;
use App\Models\users;
use App\Models\apartments;
use App\Models\Appointments;

class AppointmentSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        $users = users::where('role', 'Người thuê')->pluck('id');
        $apartments = apartments::pluck('apartment_id');

        for ($i = 0; $i < 10; $i++) {
            $status = $faker->randomElement(['Chờ xác nhận', 'Đã xác nhận', 'Hủy']);

            $user_id = $faker->randomElement($users);
            $apartment_id = $faker->randomElement($apartments);

            Appointments::create([
                'user_id' => $user_id,
                'apartment_id' => $apartment_id,
                'appointment_date_time' => $faker->dateTimeBetween('now', '+1 month'),
                'status' => $status,
            ]);
        }
    }
}

