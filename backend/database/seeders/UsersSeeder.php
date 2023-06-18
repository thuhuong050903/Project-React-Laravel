<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\users;
use Faker\Factory as Faker;

class UsersSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        
        $vietnamAddresses = [
            'Đà Nẵng, Sơn Trà, Phường Mân Thái, Đường Trần Hưng Đạo',
            'Đà Nẵng, Thanh Khê, Phường Thanh Khê Đông, Đường Lê Duẩn',
            'Đà Nẵng, Cẩm Lệ, Phường Khuê Trung, Đường Tôn Đức Thắng',
            'Đà Nẵng, Ngũ Hành Sơn, Phường Mỹ An, Đường Trường Sa',
            'Đà Nẵng, Hòa Vang, Phường Hoà Liên, Đường Đại Lộ Đông Tây',
            'Đà Nẵng, Hải Châu, Phường Thanh Bình, Đường Bạch Đằng',
        ];

        foreach ($vietnamAddresses as $address) {
            users::create([
                'username' => $faker->userName,
                'fullname' => $faker->name,
                'email' => $faker->unique()->email,
                'phone' => $faker->phoneNumber,
                'password' => bcrypt('password'), // Thay 'password' bằng mật khẩu mà bạn muốn
                'birthday' => $faker->date('Y-m-d'),
                'address' => $address,
                'role' => $faker -> randomElement(['Người thuê', 'Chủ sở hữu'])
        
            ]);
        }
    }
}
