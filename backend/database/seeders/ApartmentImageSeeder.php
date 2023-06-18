<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ApartmentImage;
use App\Models\apartments;
use Faker\Factory as Faker;

class ApartmentImageSeeder extends Seeder
{
    public function run()
    {
        // Tạo dữ liệu giả cho bảng apartment_images
        $faker = Faker::create();

        // Số lượng căn hộ
        $apartmentCount = 10;
        $apartments = apartments::pluck('apartment_id');

        // Số lượng ảnh cho mỗi căn hộ
        $imageCountPerApartment = 5;

        foreach ($apartments as $apartmentId) {
            for ($i = 1; $i <= $imageCountPerApartment; $i++) {
                ApartmentImage::create([
                    'apartment_id' => $apartmentId,
                    'image_path' => $faker->imageUrl(640, 480),
                ]);
            }
        }
    }
}
