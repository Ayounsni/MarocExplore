<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Favoris;
use App\Models\Itineraire;

class FavorisController extends Controller
{
    public function create($idItineraire){

        $itineraire = Itineraire::find($idItineraire);
        if (!$itineraire) {
            return response()->json(['message' => 'Itinéraire non trouvé'], 404);
        }
        $favoris = Favoris::where('itineraire_id', $idItineraire)
        ->where('user_id', auth()->id())
        ->first();
        if ($favoris) {
            return response()->json(['message' => 'Itinéraire déja ajouter'], 404);
        } else{

            $favoris = Favoris::create([
                'itineraire_id' => $idItineraire,
                'user_id' => auth()->id(), 
            ]);
    
            return response()->json($favoris, 201);
        }
    }

    public function index()
    {
        $favoris = Favoris::where('user_id', auth()->id())->with('user')->with('itineraire')->get();

        return response()->json($favoris);
    }
}
