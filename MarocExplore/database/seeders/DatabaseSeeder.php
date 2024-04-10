<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Categorie;
use App\Models\Itineraire;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Itineraire::factory(2)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        Categorie::create([ 
            'nom' => 'plage',
        ]);
        Categorie::create([ 
            'nom' => 'montagne',
        ]);
        Categorie::create([ 
            'nom' => 'rivière',
        ]);
        Categorie::create([ 
            'nom' => 'monument',
        ]);
    }
}
