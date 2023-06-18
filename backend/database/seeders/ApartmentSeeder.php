<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\users;
use App\Models\apartments;
use Faker\Factory as Faker;

class ApartmentSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create('vi_VN');
        $owners = users::where ('role','Chủ sở hữu') ->get();
        foreach ($owners as $owner) {
        for ($i = 0; $i < 10; $i++) {
            apartments::create([
                'user_id' => $owner-> id, // Thay số 10 bằng số người dùng hiện có trong bảng "users"
                'description' => $faker->text,
                'price' => $faker->numberBetween(1000000, 30000000),
                'number_room' => $faker->numberBetween(1, 5),
                'area' => $faker->numberBetween(50, 200),
                'address_id' => $faker->unique()->numberBetween(1, 50), // Thay số 50 bằng số địa chỉ hiện có trong bảng "addresses"
                'type_room' => $faker->randomElement(['Phòng ngắn hạn', 'Phòng dài hạn']),
            ]);
        }}
    }
}
