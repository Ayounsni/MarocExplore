<?php

use App\Models\Categorie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\ItineraireController;
use App\Http\Controllers\FavorisController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/




Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::get('/route', [ItineraireController::class, 'index']);
Route::get('/routee/{id}', [ItineraireController::class, 'show']);
Route::post('/search', [ItineraireController::class, 'search']);
Route::get('/filtrecat/{id}', [ItineraireController::class, 'filterByCategory']);
Route::post('/filtredur', [ItineraireController::class, 'filterByTime']);


Route::group(['middleware'=> ['auth:sanctum']],function(){
    Route::get('/categorie', [CategorieController::class, 'index']);
    Route::post('/logout', [UserController::class, 'logout']);
    Route::post('/addroute', [ItineraireController::class, 'store']);
    Route::put('/editroute/{id}', [ItineraireController::class, 'update']);
    Route::delete('/deleteroute/{id}', [ItineraireController::class, 'destroy']);
    Route::get('/addfavoris/{id}', [FavorisController::class, 'create']);
    Route::get('/favoris', [FavorisController::class, 'index']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});




