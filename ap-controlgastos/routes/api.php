<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DepartamentosController;
use App\Http\Controllers\PuestosController;
use App\Http\Controllers\RolePermissionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::group([

    // 'middleware' => 'api',
    'prefix' => 'auth',
    // 'middleware' => ['auth:api','role:admin'],

], function ($router) {
    Route::post('/register', [AuthController::class, 'register'])->name('register');
    Route::post('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::post('/refresh', [AuthController::class, 'refresh'])->name('refresh');
    Route::post('/me', [AuthController::class, 'me'])->name('me');
});

//solo rutas post, get y delete si van en corchete, mientras qye resource no necesita corchete

//end point para roles con resources para llamar todos los metodos
Route::group([

    'middleware' => 'auth:api',
    //'prefix' => 'auth',
], function ($router) {
    Route::resource("roles",RolePermissionController::class);
});

//endpoint para el registro de departamentos
Route::group([
    'middleware' => 'auth:api',
], function ($router) {
    Route::resource('departamentos', DepartamentosController::class);
});

//endpoint para el registro de puestos
Route::group([
    'middleware' => 'auth:api',
], function ($router) {
    Route::resource('puestos', PuestosController::class);
});
// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
