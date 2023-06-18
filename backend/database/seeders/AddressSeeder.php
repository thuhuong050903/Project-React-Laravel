<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\addresses;
use Faker\Factory as Faker;



class AddressSeeder extends Seeder
{
    public function run()
    {        $faker = Faker::create();


        // Quận Sơn Trà
        $sonTraWards = [
            'Phường Mân Thái',
            'Phường An Hải Bắc',
            'Phường Phước Mỹ',
        ];
        $sonTraStreets = [
            'Đường Trần Hưng Đạo',
            'Đường Ngô Quyền',
            'Đường Võ Nguyên Giáp',
        ];
        $this->createAddresses('Sơn Trà', $sonTraWards, $sonTraStreets,$faker);

        // Quận Thanh Khê
        $thanhKheWards = [
            'Phường Thanh Khê Đông',
            'Phường Thanh Khê Tây',
            'Phường Xuân Hà',
        ];
        $thanhKheStreets = [
            'Đường Lê Duẩn',
            'Đường Hoàng Văn Thụ',
            'Đường Nguyễn Tri Phương',
        ];
        $this->createAddresses('Thanh Khê', $thanhKheWards, $thanhKheStreets,$faker);

        // Quận Cẩm Lệ
        $camLeWards = [
            'Phường Khuê Trung',
            'Phường Hòa An',
            'Phường Hòa Phát',
        ];
        $camLeStreets = [
            'Đường Tôn Đức Thắng',
            'Đường Nguyễn Văn Linh',
            'Đường Hoàng Diệu',
        ];
        $this->createAddresses('Cẩm Lệ', $camLeWards, $camLeStreets,$faker);

        // Quận Ngũ Hành Sơn
        $nguHanhSonWards = [
            'Phường Mỹ An',
            'Phường Khuê Mỹ',
            'Phường Hoà Quý',
        ];
        $nguHanhSonStreets = [
            'Đường Trường Sa',
            'Đường Nguyễn Tất Thành',
            'Đường Nguyễn Lương Bằng',
        ];
        $this->createAddresses('Ngũ Hành Sơn', $nguHanhSonWards, $nguHanhSonStreets,$faker);

        // Quận Hòa Vang
        $hoaVangWards = [
            'Phường Hoà Liên',
            'Phường Hòa Hiệp Nam',
            'Phường Hòa Hiệp Bắc',
        ];
        $hoaVangStreets = [
            'Đường Đại Lộ Đông Tây',
            'Đường Nguyễn Hữu Thọ',
            'Đường Hoàng Diệu',
        ];
        $this->createAddresses('Hòa Vang', $hoaVangWards, $hoaVangStreets,$faker);

        // Quận Hải Châu
        $haiChauWards = [
            'Phường Thanh Bình',
            'Phường Thanh Thuận',
            'Phường Hải Châu 1',
        ];
        $haiChauStreets = [
            'Đường Bạch Đằng',
            'Đường Trần Phú',
            'Đường Lê Đình Lý',
        ];
        $this->createAddresses('Hải Châu', $haiChauWards, $haiChauStreets,$faker);
    }


    private function createAddresses($district, $wards, $streets,$faker)
    {        

        foreach ($wards as $ward) {
            foreach ($streets as $street) {
                addresses::create([
                    'number' => $faker->numerify(),
                    'district' => $district,
                    'ward' => $ward,
                    'street' => $street,
                ]);
            }
        }
    }
}

