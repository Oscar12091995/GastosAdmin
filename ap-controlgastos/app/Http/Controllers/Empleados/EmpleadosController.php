<?php

namespace App\Http\Controllers\Empleados;

use App\Http\Controllers\Controller;
use App\Models\Empleados;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class EmpleadosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get("search");

        $empleados = Empleados::where("nombre","like","%".$search."%")->orderBy("id","asc")->paginate(25);
        return response()->json([
           "total" => $empleados->total(),

           "empleados" => $empleados->map(function($empleado){
               return ([
                   "id" => $empleado->id,
                   "nombre_completo" => trim(($empleado->nombre ?? '') . ' ' . ($empleado->appaterno ?? '') . ' ' . ($empleado->apmaterno ?? '')),
                   'telefono' => $empleado->telefono,
                   "curp" => $empleado->curp,
                   "rfc" => $empleado->rfc,
                   "seguro_social" => $empleado->seguro_social,
                   "genero" => $empleado->genero,
                   "estatus" => $empleado->estatus,
                   "avatar" => $empleado->avatar ? env('APP_URL')."storage/".$empleado->avatar : null,
                   //este tambien es valido
               //$puestos = Puesto::where('empleado_id', $empleado->id)->pluck("descripcion");
                   "created_at" => $empleado->created_at->format("Y-m-d h:i A"),
               ]);
               //return $departamento;
           }),
       ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $IS_EMPLEADO = Empleados::where("nombre",$request->nombre)->first();
        if ($IS_EMPLEADO) {
            return response()->json([
                "message" => 403,
                "message_text" => "Esta empleado ya existe"
            ]);
        }

        if ($request->hasFile("image")) {
            $path = Storage::putFile("empleados", $request->file("image"));
            $request->request->add(["avatar" => $path]);
        }

        $empleado = Empleados::create([
            'guard_name' => 'api',
            'nombre' => $request->nombre,
            'appaterno' => $request->appaterno,
            'apmaterno' => $request->apmaterno,
            'telefono' => $request->telefono,
            'curp' => $request->curp,
            'rfc' => $request->rfc,
            'seguro_social' => $request->seguro_social,
            'domicilio' => $request->domicilio,
            'colonia' => $request->colonia,
            'municipio' => $request->municipio,

        ]);

        //continuar en el update y delete  y ver para hacer en 2 rutas
        return response()->json([
            "message" => 200,
            "empleados" => [
                "id" => $empleado->id,
                   "nombre_completo" => trim(($empleado->nombre ?? '') . ' ' . ($empleado->appaterno ?? '') . ' ' . ($empleado->apmaterno ?? '')),
                   'telefono' => $empleado->telefono,
                   "curp" => $empleado->curp,
                   "rfc" => $empleado->rfc,
                   "seguro_social" => $empleado->seguro_social,
                   "genero" => $empleado->genero,
                   "estatus" => $empleado->estatus,
                   "avatar" => $empleado->avatar ? env('APP_URL')."storage/".$empleado->avatar : null,
                   //este tambien es valido
               //$puestos = Puesto::where('empleado_id', $empleado->id)->pluck("descripcion");
                   "created_at" => $empleado->created_at->format("Y-m-d h:i A"),
            ]
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
