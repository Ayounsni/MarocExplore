<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Itineraire extends Model
{
    use HasFactory;

    protected $fillable = [
        'titre' ,
        'id_categorie',
        'dure',
        'image',
        'id_user'
    ];


    public function categorie()
    {
        return $this->belongsTo(Categorie::class,'id_categorie');
    }

    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }

    public function destinations()
    {
        return $this->hasMany(Destination::class,'itineraire_id');
    }

    public function favoris()
    {
        return $this->belongsToMany(User::class, 'favoris');
    }

}
