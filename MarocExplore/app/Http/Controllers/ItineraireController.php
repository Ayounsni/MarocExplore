<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Itineraire;
use App\Models\Destination;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class ItineraireController extends Controller
{

    public function index()
    {
        $itineraires = Itineraire::with('destinations')->with('categorie')->get();

        return response()->json($itineraires);
    }

    public function show($id)
    {
        $itineraire = Itineraire::with('categorie')->find($id);

        return response()->json($itineraire);
    }
    public function store(Request $request){

        $titre = $request->input('titre');
        $id_categorie = $request->input('id_categorie');
        $duree = $request->input('duree');
        $image = $request->input('image');
        $destinations = $request->input('destinations');
    
        
        $request->validate([
            'titre' => 'required|string|max:255',
            'id_categorie' => 'required|exists:categories,id',
            'duree' => 'required|integer',
            'image' => 'required',
            'destinations' => 'required|array|min:2',
            'destinations.*.nom' => 'required|string|max:255',
            'destinations.*.lieu' => 'required|string|max:255',
            'destinations.*.endroit' => 'nullable|string',
            'destinations.*.plat' => 'nullable|string',
            'destinations.*.activite' => 'nullable|string',
        ]);
    
        
        $itineraire = Itineraire::create([
            'titre' => $titre,
            'id_categorie' => $id_categorie,
            'dure' => $duree,
            'image' => $image,
            'id_user' => auth()->id(), 
        ]);
    
        
        $lastItineraireId = $itineraire->id;
    
        
        foreach ($destinations as $destinationData) {
            Destination::create([
                'nom' => $destinationData['nom'],
                'lieu' => $destinationData['lieu'],
                'endroit' => $destinationData['endroit'],
                'plat' => $destinationData['plat'],
                'activite' => $destinationData['activite'],
                'itineraire_id' => $lastItineraireId, 
                'user_id' => auth()->id(), 
            ]);
        }

        return response()->json(['message' => 'Itinéraire créé avec succès'], 201);

    }
    public function update(Request $request , $id){

        $itineraire = Itineraire::find($id);
        if (!$itineraire) {
            return response()->json(['message' => 'Itinéraire non trouvé'], 404);
        }
    
        if ($itineraire->id_user !== auth()->user()->id) {
            return response()->json(['message' => 'Vous n\'êtes pas autorisé à mettre à jour cet itinéraire'], 402);
        }
        $itineraire->update($request->all());
        return $itineraire;

    }
    public function destroy($id){

        $itineraire = Itineraire::find($id);
        if (!$itineraire) {
            return response()->json(['message' => 'Itinéraire non trouvé'], 404);
        }
    
        if ($itineraire->id_user !== auth()->user()->id) {
            return response()->json(['message' => 'Vous n\'êtes pas autorisé à supprimer cet itinéraire'], 403);
        }

        Itineraire::destroy($id);
        
        return response()->json(['message' => 'Itinéraire suprimmer avec succès'], 201);
    }
    public function search(Request $request)
    {

    $categorie = $request->input('categorie');
    $duree = $request->input('duree');

    $query = Itineraire::query();

    $query->where(function ($query) use ($categorie, $duree) {
        if ($categorie) {
            $query->whereHas('categorie', function ($query) use ($categorie) {
                $query->where('nom', 'like', '%' . $categorie . '%');
            });
        }

        if ($duree) {
            $query->where('dure', 'like', '%' . $duree . '%');
        }
    });


    $itineraires = $query->with('destinations')->with('categorie')->get();

    if ($itineraires->isEmpty()) {

        return response()->json(['message' => 'Aucun résultat trouvé'], 404);
    }


        return response()->json($itineraires);
    }

    public function filterByCategory($categorieId)
    {
    
    $itineraires = Itineraire::where('id_categorie', $categorieId)->with('categorie')->get();

    if ($itineraires->isEmpty()) {

        return response()->json(['message' => 'Aucun résultat trouvé'], 404);
    }
    
    return response()->json($itineraires);
    }
    public function filterByTime(Request $request)
    {
    
       $query = Itineraire::query();

       $dure = $request->input('dure');

    if ($dure === 'inferieure7') {
        $query->where('dure', '<', 7);
    } elseif ($dure === 'superieure7') {
        $query->where('dure', '>', 7);
    } elseif ($dure === 'egal2') {
        $query->where('dure', '=', 2);
    }

    $itineraires = $query->get();

    if ($itineraires->isEmpty()) {

        return response()->json(['message' => 'Aucun résultat trouvé'], 404);
    }
        return response()->json($itineraires);
    }

}
