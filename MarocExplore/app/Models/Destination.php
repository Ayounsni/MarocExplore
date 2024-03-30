<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Destination extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom' ,
        'lieu' ,
        'endroit',
        'plat',
        'activite' ,
        'itineraire_id', 
        'user_id'
    ];

    public function itineraire()
    {
        return $this->belongsTo(Itineraire::class,'itineraire_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }
}
