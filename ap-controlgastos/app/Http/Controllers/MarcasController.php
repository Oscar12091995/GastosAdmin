<?php

namespace App\Http\Controllers;

use App\Models\Marcas;
use Illuminate\Http\Request;

class MarcasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get("search");

        //este hace la query a roles para filtrar por nombre con una paginacion de 25
        $marcas = Marcas::where("descripcion","like","%".$search."%")->orderBy("id","asc")->paginate(25);
        return response()->json([
           "total" => $marcas->total(),

           "marcas" => $marcas->map(function($marca){
               return ([
                   "id" => $marca->id,
                   "descripcion" => $marca->descripcion,
                   "estatus" => $marca->estatus,
                   //este tambien es valido
               //$puestos = Puesto::where('marca_id', $marca->id)->pluck("descripcion");
                   "created_at" => $marca->created_at->format("Y-m-d h:i A"),
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
        $IS_MARCA = Marcas::where("descripcion",$request->descripcion)->first();
        if ($IS_MARCA) {
            return response()->json([
                "message" => 403,
                "message_text" => "Esta marca ya existe"
            ]);
        }

        $marca = Marcas::create([
            'guard_name' => 'api',
            'descripcion' => $request->descripcion,
        ]);

        return response()->json([
            "message" => 200,
            "marca" => [
                "id" => $marca->id,
                "descripcion" => $marca->descripcion,
                "estatus" => 1,
                "created_at" => $marca->created_at->format("Y-m-d h:i A"),
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
        $IS_MARCA = Marcas::where("descripcion",$request->descripcion)->where("id","<>",$id)->first();
        if ($IS_MARCA) {
            return response()->json([
                "message" => 403,
                "message_text" => "Esta marca ya existe"
            ]);
        }

        $marca = Marcas::findOrFail($id);
        $marca->update($request->all());

        return response()->json([
            "message" => 200,
            "marca" => [
                "id" => $marca->id,
                "descripcion" => $marca->descripcion,
                "estatus" => 1,
                "created_at" => $marca->created_at->format("Y-m-d h:i A"),
            ]
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $marca = Marcas::findOrFail($id);
            $marca->delete(); // Elimina y, gracias a ON DELETE CASCADE, los puestos también se eliminan

            return response()->json([
                "message" => 200,
                "message_text" => "Marca eliminada correctamente."
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "message" => 500,
                "message_text" => "Error al eliminar la Marca.",
                "error" => $e->getMessage() // Opcional: muestra detalles del error (útil en desarrollo)
            ], 500);
        }
    }
}
