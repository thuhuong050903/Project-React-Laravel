<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\services;

class ServiceSeeder extends Seeder
{
    public function run()
    {
        $services = [
            [
                'description' => 'Dịch vụ dọn dẹp căn hộ: Bao gồm việc làm sạch căn hộ, vệ sinh và thu dọn rác thải.',
                'price' => 500000,
                'contact_info' => 'Email: cleaning@example.com, Điện thoại: 0123456789',
            ],
            [
                'description' => 'Dịch vụ bảo trì thiết bị: Đảm bảo sự hoạt động tốt của các thiết bị trong căn hộ, như điều hòa nhiệt độ, thiết bị gia dụng, hệ thống điện, vv.',
                'price' => 800000,
                'contact_info' => 'Email: maintenance@example.com, Điện thoại: 0123456789',
            ],
            [
                'description' => 'Dịch vụ bảo vệ: Đảm bảo an ninh và an toàn cho cư dân trong khu căn hộ.',
                'price' => 600000,
                'contact_info' => 'Email: security@example.com, Điện thoại: 0123456789',
            ],
            [
                'description' => 'Dịch vụ giặt là: Cung cấp dịch vụ giặt là và là ủi đồ cho cư dân.',
                'price' => 300000,
                'contact_info' => 'Email: laundry@example.com, Điện thoại: 0123456789',
            ],
            [
                'description' => 'Dịch vụ hỗ trợ kỹ thuật 24/7: Sẵn sàng hỗ trợ cư dân trong mọi vấn đề cần thiết, từ sự cố kỹ thuật đến yêu cầu khẩn cấp.',
                'price' => 1000000,
                'contact_info' => 'Email: techsupport@example.com, Điện thoại: 0123456789',
            ],
            [
                'description' => 'Dịch vụ Internet và truyền hình cáp: Cung cấp kết nối Internet nhanh chóng và các gói truyền hình cáp đa dạng cho cư dân.',
                'price' => 500000,
                'contact_info' => 'Email: internet@example.com, Điện thoại: 0123456789',
            ],
            [
                'description' => 'Dịch vụ bãi đỗ xe: Cung cấp chỗ đậu xe an toàn và thuận tiện cho cư dân.',
                'price' => 200000,
                'contact_info' => 'Email: parking@example.com, Điện thoại: 0123456789',
            ],
            [
                'description' => 'Dịch vụ tiện ích chung:  Bao gồm sử dụng các tiện ích chung như phòng gym, hồ bơi, sân chơi trẻ em, vv.',
                'price' => 1000000,
                'contact_info' => 'Email: facilities@example.com, Điện thoại: 0123456789',
            ],
            [
                'description' => 'Dịch vụ đặt chỗ và đón tiếp khách: Hỗ trợ đặt chỗ và đón tiếp khách hàng và khách thuê căn hộ.',
                'price' => 500000,
                'contact_info' => 'Email: reception@example.com, Điện thoại: 0123456789',
            ],
            [
                'description' => 'Dịch vụ gửi thư và bưu phẩm: Cung cấp dịch vụ gửi thư và bưu phẩm nhanh chóng và đáng tin cậy.',
                'price' => 200000,
                'contact_info' => 'Email: mail@example.com, Điện thoại: 0123456789',
            ],
        ];

        foreach ($services as $service) {
            services::create($service);
        }
    }
}

