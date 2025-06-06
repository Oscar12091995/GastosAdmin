<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Dotenv\Validator as DotenvValidator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Validator;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        $credentials = $request->only('email', 'password');
        $token = Auth::attempt($credentials);

        if (!$token) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 401);
        }

        $user = Auth::user();
        $permissions = auth("api")->user()->getAllPermissions()->map(function($perm){
            return $perm->name;
        });

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 60,
            'user' => [
                "full_name" => auth('api')->user()->name.' '.auth('api')->user()->apellido,
                "email" => auth('api')->user()->email,
                "avatar" => auth('api')->user()->avatar ? env("APP_URL")."/storage/".auth('api')->user()->avatar : 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
                "role" => auth('api')->user()->role->name,
                "permission" => $permissions
            ]
            // 'user' => $user,
            // 'authorization' => [
            //     'token' => $token,
            //     'type' => 'bearer',
            // ]
        ]);

        //respondWithToken($token);
    }

    public function register(Request $request)
    {
        $this->authorize("create", User::class);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'message' => 'User created successfully',
            'user' => $user
        ]);
    }


    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    // public function register() {
    //     $validator = DotenvValidator::make(request()->all(), [
    //         'name' => 'required',
    //         'email' => 'required|email|unique:users',
    //         'password' => 'required|min:8',
    //     ]);

    //     if($validator->fails()){
    //         return response()->json($validator->errors()->toJson(), 400);
    //     }

    //     $user = new User;
    //     $user->name = request()->name;
    //     $user->email = request()->email;
    //     $user->password = bcrypt(request()->password);
    //     $user->save();

    //     return response()->json($user, 201);
    // }


    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    // public function login()
    // {
    //     $credentials = request(['email', 'password']);

    //     if (! $token = auth()->attempt($credentials)) {
    //         return response()->json(['error' => 'Unauthorized'], 401);
    //     }

    //     return $this->respondWithToken($token);
    // }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth('api')->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth('api')->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    // public function refresh()
    // {
    //     return $this->respondWithToken(auth('api')->refresh());
    // }
    public function refresh()
    {
        return response()->json([
            'user' => Auth::user(),
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }
    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        $permissions = auth("api")->user()->getAllPermissions()->map(function($perm){
            return $perm->name;
        });
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 60,
            'user' => [
                "full_name" => auth('api')->user()->name.' '.auth('api')->user()->apellido,
                "email" => auth('api')->user()->email,
                "avatar" => auth('api')->user()->avatar ? env("APP_URL")."/storage/".auth('api')->user()->avatar : 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
                "role" => auth('api')->user()->role->name,
                "permission" => $permissions
            ]
        ]);
    }
}
