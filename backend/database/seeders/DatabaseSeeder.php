<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        $this->call(AddressSeeder::class);
        $this->call(UsersSeeder::class);
        $this->call(ApartmentSeeder::class);
        $this->call(ApartmentImageSeeder::class);
        $this->call(ApartmentIssueSeeder::class);
        $this->call(AppointmentSeeder::class);
        $this->call(UpdateApartmentsSeeder::class);
        $this->call(BookApartmentSeeder::class);
        $this->call(RatingSeeder::class);
        $this->call(ServiceSeeder::class);
        $this->call(ContractSeeder::class);
        $this->call(ServiceApartmentSeeder::class);


    }
}
