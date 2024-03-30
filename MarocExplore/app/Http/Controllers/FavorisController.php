<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Favoris;

class FavorisController extends Controller
{
    public function create($idItineraire){

        $favoris = Favoris::where('itineraire_id', $idItineraire)
        ->where('user_id', auth()->id())
        ->first();
        if ($favoris) {
            return response()->json(['message' => 'Itinéraire non trouvé'], 404);
        } else{

            $favoris = Favoris::create([
                'itineraire_id' => $idItineraire,
                'user_id' => auth()->id(), 
            ]);
    
            return response()->json($favoris, 201);
        }
    }
}
