<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoriasController;
use App\Http\Controllers\DepartamentosController;
use App\Http\Controllers\Empleados\EmpleadosController;
use App\Http\Controllers\MarcasController;

use App\Http\Controllers\ProveedoresController;
use App\Http\Controllers\PuestosController;
use App\Http\Controllers\RolePermissionController;
use App\Http\Controllers\Usuario\UserAccessController;
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
    Route::resource('departamentos', DepartamentosController::class);

    Route::post('/usuarios/{id}',[UserAccessController::class, 'update']);
    Route::get('usuarios/rols', [UserAccessController::class, 'rols']);
    Route::resource("usuarios",UserAccessController::class);

    Route::get("puestos/config", [PuestosController:: class, 'config']);
    Route::resource('puestos', PuestosController::class);

    Route::resource('categorias', CategoriasController::class);

    Route::resource('marcas', MarcasController::class);

    Route::resource('proveedores', ProveedoresController::class);
    //rutas que se necesitan para llenar listas de select u otras campos necesarios
    Route::post('empleados/{id}',[EmpleadosController::class, 'update']);
    Route::get("empleados/departaments", [EmpleadosController:: class, 'departaments']);
    Route::get("empleados/puests", [EmpleadosController:: class, 'puests']);
    Route::resource("empleados", EmpleadosController::class);
});

//endpoint para el registro de departamentos

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
