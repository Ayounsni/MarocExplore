<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Itineraire;
use App\Models\Categorie;
use App\Models\User;
use Faker\Factory as Faker;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Itineraire>
 */
class ItineraireFactory extends Factory
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
            'id_categorie' => Categorie::factory()->create()->id,
            'id_user' => User::factory()->create()->id,
            'titre' => $this->faker->sentence,
            'image' => $this->faker->imageUrl(),
            'dure' => $this->faker->numberBetween(1, 10),
        ];
    }
}
