<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use Laravel\Sanctum\Sanctum;

class AuthTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     */
public function testUserLoginWithValidCredentials()
    {
        // Créer un utilisateur de test
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password123'),
        ]);

        // Faire une requête POST à l'API pour l'authentification
        $response = $this->postJson('/api/login', [
            'email' => 'test@example.com',
            'password' => 'password123',
        ]);

        // Vérifier que la réponse est un succès (HTTP 201 Created)
        $response->assertStatus(201);

        // Vérifier que la réponse contient les données de l'utilisateur
        $response->assertJsonStructure([
            'user' => [
                'id',
                'name',
                'email',
                'created_at',
                'updated_at',
            ],
            'token',
        ]);
    }
    
    /**
     * Test pour vérifier l'authentification d'un utilisateur avec des identifiants invalides.
     *
     * @return void
     */
    public function testUserLoginWithInvalidCredentials()
    {
        // Faire une requête POST à l'API avec des identifiants invalides
        $response = $this->postJson('/api/login', [
            'email' => 'invalid@example.com',
            'password' => 'invalidpassword',
        ]);

        // Vérifier que la réponse est une erreur d'authentification (HTTP 401 Unauthorized)
        $response->assertStatus(401);

        // Vérifier que la réponse contient un message d'erreur
        $response->assertJson([
            'message' => 'bad cred',
        ]);
    }
    public function testUserRegistration()
    {
        $userData = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'password123',
        ];

        // Faire une requête POST à l'API pour l'inscription d'un nouvel utilisateur
        $response = $this->postJson('/api/register', $userData);

        // Vérifier que la réponse est un succès (HTTP 201 Created)
        $response->assertStatus(201);

        // Vérifier que la réponse contient les données de l'utilisateur
        $response->assertJsonStructure([
            'user' => [
                'id',
                'name',
                'email',
                'created_at',
                'updated_at',
            ],
            'token',
        ]);

        // Vérifier que l'utilisateur a été correctement enregistré dans la base de données
        $this->assertDatabaseHas('users', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
        ]);
    }
    public function testUserLogout()
    {
        // Créer un utilisateur de test
        $user = User::factory()->create();

        // Authentifier l'utilisateur
        Sanctum::actingAs($user);

        // Faire une requête POST à l'API pour déconnecter l'utilisateur
        $response = $this->postJson('/api/logout');

        // Vérifier que la réponse est un succès (HTTP 200 OK)
        $response->assertStatus(200);

        // Vérifier que le token d'authentification de l'utilisateur a été supprimé
        $this->assertTrue($user->tokens()->count() === 0);

        // Vérifier que la réponse contient le message "logged out"
        $response->assertJson([
            'message' => 'logged out'
        ]);
    }
}
