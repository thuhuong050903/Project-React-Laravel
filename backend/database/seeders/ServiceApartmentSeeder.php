<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\service_apartment;
use App\Models\services;
use App\Models\apartments;

class ServiceApartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $services = services::pluck('service_id');
        $apartments = apartments::pluck('apartment_id');

        for ($i = 0; $i < 10; $i++) {
            $serviceId = $services->random();
            $apartmentId = $apartments->random();

            service_apartment::create([
                'service_id' => $serviceId,
                'apartment_id' => $apartmentId,
            ]);
        }
    }
}
