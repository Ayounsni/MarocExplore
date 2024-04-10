<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Laravel\Sanctum\Sanctum;
use App\Models\Itineraire;
use App\Models\Categorie;
use App\Models\Destination;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class ItineraireTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     */

     public function testIndex()
     {
         // Créez quelques données d'itinéraire avec des destinations associées dans la base de données

         $itineraire = Itineraire::factory()->create();
         $destinations = Destination::factory()->count(3)->create(['itineraire_id' => $itineraire->id]);

 
         // Envoyez une requête HTTP GET à la route correspondante
         $response = $this->get('/api/route');
 
         // Vérifiez que la réponse a un code de statut HTTP 200 (OK)
         $response->assertStatus(200);
 
         // Vérifiez que la réponse contient les données des itinéraires avec leurs destinations associées
         $response->assertJson([
             [
                 'id' => $itineraire->id,
                 'titre' => $itineraire->titre,
                 // Ajoutez d'autres attributs d'itinéraire à vérifier si nécessaire
                 'destinations' => $itineraire->destinations->toArray(),
                 // Assurez-vous que les destinations de l'itinéraire sont présentes dans la réponse JSON
             ]
         ]);
     }
    public function testUpdateItineraireSuccess()
    {
        $user = User::factory()->create();

        // Créer un itinéraire appartenant à cet utilisateur
        $itineraire = Itineraire::factory()->create(['id_user' => $user->id]);

        // Simuler l'authentification de l'utilisateur
        Sanctum::actingAs($user);

        // Préparer les données de mise à jour
        $newData = [
            'titre' => 'Nouveau titre',
            'dure' => 10,
            // Ajoutez d'autres champs à mettre à jour si nécessaire
        ];

        // Envoyer une requête de mise à jour à l'API
        $response = $this->putJson("/api/editroute/{$itineraire->id}", $newData);

        // Vérifier que la mise à jour a réussi
        $response->assertStatus(200); // Assurez-vous que vous obtenez un code de réponse HTTP 200

        // Vérifier que les données de l'itinéraire ont été mises à jour dans la base de données
        $updatedItineraire = Itineraire::find($itineraire->id);
        $this->assertEquals($newData['titre'], $updatedItineraire->titre);
        $this->assertEquals($newData['dure'], $updatedItineraire->dure);
        // Ajoutez d'autres assertions pour vérifier les autres champs mis à jour si nécessaire
    }
    public function testDeleteItineraireSuccess()
    {
        $user = User::factory()->create();

        // Créer un itinéraire appartenant à cet utilisateur
        $itineraire = Itineraire::factory()->create(['id_user' => $user->id]);

        // Simuler l'authentification de l'utilisateur
        Sanctum::actingAs($user);

        // Envoyer une requête de mise à jour à l'API
        $response = $this->deleteJson("/api/deleteroute/{$itineraire->id}");

        $response->assertStatus(201); // Assurez-vous que vous obtenez un code de réponse HTTP 200

        // Vérifier que les données de l'itinéraire ont été mises à jour dans la base de données
        $this->assertDatabaseMissing('itineraires', ['id' => $itineraire->id]);

        $response->assertJson([
            'message' => 'Itinéraire suprimmer avec succès'
        ]);

    }
}
