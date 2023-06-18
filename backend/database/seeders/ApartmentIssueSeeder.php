<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\apartments;
use App\Models\users;
use App\Models\apartmentIssue;
use Faker\Factory as Faker;

class ApartmentIssueSeeder extends Seeder
{
    public function run()
{
    // Tạo dữ liệu giả cho bảng apartment_issues
    $faker = Faker::create();

    // Lấy danh sách các căn hộ
    $apartments = apartments::pluck('apartment_id');
    $users = users::where('role', 'Người thuê')->get();

    // Số lượng vấn đề cho mỗi căn hộ
    $issueCountPerApartment = 2;

    foreach ($apartments as $apartmentId) {
        for ($j = 1; $j <= $issueCountPerApartment; $j++) {
            $user = $users->random(); // Chọn ngẫu nhiên một người dùng từ danh sách người thuê

            ApartmentIssue::create([
                'apartment_id' => $apartmentId,
                'user_id' => $user->id,
                'description' => $faker->paragraph(),
                'report_date' => $faker->date(),
                'resolved' => $faker->randomElement(['Đang chờ xác nhận', 'Đã giải quyết', 'Đã hủy yêu cầu']),
            ]);
        }
    }
}

}

