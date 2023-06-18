<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\admin;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        admin::create(
            [
                'name' => 'Tran Quoc Huu',
                'email' => 'huu.tran24@gmail.com',
                'phone' => '0814598741',
                'password' => '123456789'
            ]
            );
    }
}
