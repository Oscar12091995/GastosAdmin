<?php

namespace App\Http\Controllers\Empleados;

use App\Http\Controllers\Controller;
use App\Models\Departamento;
use App\Models\Empleados;
use App\Models\Puestos;
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

            "empleados" => $empleados
        //->map(function($empleado){
        //        return ([
        //            "id" => $empleado->id,
        //            "nombre_completo" => trim(($empleado->nombre ?? '') . ' ' . ($empleado->appaterno ?? '') . ' ' . ($empleado->apmaterno ?? '')),
        //            'telefono' => $empleado->telefono,
        //            "curp" => $empleado->curp,
        //            "rfc" => $empleado->rfc,
        //            "seguro_social" => $empleado->seguro_social,
        //            "genero" => $empleado->genero,
        //            "estatus" => $empleado->estatus,
        //            "avatar" => $empleado->avatar ? env('APP_URL')."storage/".$empleado->avatar : null,
        //            //este tambien es valido
        //        //$puestos = Puesto::where('empleado_id', $empleado->id)->pluck("descripcion");
        //            "created_at" => $empleado->created_at->format("Y-m-d h:i A"),
        //        ]);
        //        //return $departamento;
        //    }),
       ]);
    }

    public function departaments(){
        $departamento = Departamento::where("estatus",1)->get();

        return response([
            "departamentos" => $departamento
        ]);
    }

    public function puests(Request $request){
        $puesto = Puestos::where("departamento_id", $request->departamento_id)->where("estatus", 1)->get();

        return response([
            "puestos" => $puesto
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

        if ($request->hasFile("empleado_imagen")) {
            $path = Storage::putFile("empleados", $request->file("empleado_imagen"));
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
            'avatar' => $request->avatar,
            'genero' => $request->genero,
            'fecha_ingreso' => $request->fecha_ingreso,
            'departamento_id' => $request->departamento_id,
            'puesto_id' => $request->puesto_id,
        ]);

        //continuar en el update y delete  y ver para hacer en 2 rutas
        return response()->json([
            "message" => 200,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $empleado = Empleados::findOrFail($id);

        return response()->json([
            "empleado" => $empleado,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $IS_EMPLEADO = Empleados::where("nombre",$request->nombre)->where("id","<>",$id)->first();
        if ($IS_EMPLEADO) {
            return response()->json([
                "message" => 403,
                "message_text" => "Esta empleado ya existe"
            ]);
        }

        $empleado = Empleados::findOrFail($id);

        if ($request->hasFile("empleado_imagen")) {
            if ($empleado->avatar) {
                Storage::delete($empleado->avatar);
            }
            $path = Storage::putFile("empleados", $request->file("empleado_imagen"));
            $request->request->add(["avatar" => $path]);
        }

        $empleado->update($request->all());
        return response()->json([
            "message" => 200,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $empleado = Empleados::findOrFail($id);

        $empleado->delete();
        return response()->json([
            "message" => 200
        ]);
    }
}
