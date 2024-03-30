<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function register(Request $request){
       $input = $request->validate([
        'name'=> 'required',
        'email'=> 'required|string|unique:users,email',
        'password'=> 'required|string',
       ]);
       
       $user = User::create([
        'name' => $input['name'],
        'email' => $input['email'],
        'password' => Hash::make($input['password']),
    ]);

       $token = $user->createToken($user->name.'-AuthToken')->plainTextToken;

       $response = [
        'user' => $user,
        'token'=> $token
       ];

       return response($response,201);
    }

    public function login(Request $request){
        $input = $request->validate([
         'email'=> 'required|string',
         'password'=> 'required|string',
        ]);
        
        $user = User::where('email', $input['email'])->first();

        if(!$user || !Hash::check($input['password'],$user->password)){
            return response([
                'message' =>'bad cred'
            ], 401);
        }
 
        $token = $user->createToken($user->name.'-AuthToken')->plainTextToken;
 
        $response = [
         'user' => $user,
         'token'=> $token
        ];
 
        return response($response,201);
     }


    public function logout(Request $request){
        auth()->user()->tokens()->delete();

        return [
            'message' => "logged out"
        ];
    }
}
