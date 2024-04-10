<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favoris extends Model
{

    protected $fillable = [
        'user_id',
        'itineraire_id'
    ];
    use HasFactory;
    
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function itineraire()
    {
        return $this->belongsTo(Itineraire::class, 'itineraire_id');
    }
}
