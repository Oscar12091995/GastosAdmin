<?php

namespace App\Http\Controllers;

use App\Models\Departamento;
use App\Models\Puestos;
use Illuminate\Http\Request;

class PuestosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get("search");

        //este hace la query a roles para filtrar por nombre con una paginacion de 25
        $puestos = Puestos::with(["departamento"])->where("descripcion","like","%".$search."%")->orderBy("id","desc")->paginate(25);
        return response()->json([
           "total" => $puestos->total(),

           "puestos" => $puestos->map(function($puesto){
               return collect([
                   "id" => $puesto->id,
                   "descripcion" => $puesto->descripcion,
                   "estatus" => $puesto->estatus,
                   //este tambien es valido
               //$puestos = Puesto::where('puesto_id', $puesto->id)->pluck("descripcion");
                   "departamento" => $puesto->departamento->pluck("descripcion"),
                   "created_at" => $puesto->created_at->format("Y-m-d h:i A"),
               ]);
               //return $departamento;
           }),
       ]);
    }

    //metodo para llenar un select, creamos la funcion.
    //en una variable damos a igual al Model que tenemos como relacion
    //y simplemente devolvemos el json
    public function departamentosList(){
        $departamentos = Departamento::where("estatus",1)->get();

        return response()->json([
            "departamentos" => $departamentos,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $IS_PUESTO = Puestos::where("descripcion",$request->descripcion)->first();
        if ($IS_PUESTO) {
            return response()->json([
                "message" => 403,
                "message_text" => "Este puesto ya existe"
            ]);
        }
        //me quede aqui segui con el update y verificar los demas modulos
        $puesto = Puestos::create([
            'guard_name' => 'api',
            'descripcion' => $request->descripcion
        ]);

        return response()->json([
            "message" => 200,
            "puestos" => [
                "id" => $puesto->id,
                "departamento" => $puesto->departamento->pluck("descripcion"),
                "created_at" => $puesto->created_at->format("Y-m-d h:i A"),
                "descripcion" => $puesto->descripcion,
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
