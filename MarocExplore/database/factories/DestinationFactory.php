<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Itineraire;
use App\Models\Categorie;
use App\Models\User;
use Faker\Factory as Faker;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Destination>
 */
class DestinationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $faker = Faker::create();
        return [
            'user_id' => User::factory()->create()->id,
            'itineraire_id' => Itineraire::factory()->create()->id,
            'nom' => $faker->name,
            'lieu' => $faker->city,
            'endroit' => $faker->sentence,
            'plat' => $faker->sentence,
            'activite' => $faker->sentence,
        ];
    }
}
