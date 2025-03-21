<?php

namespace App\Http\Controllers;

use App\Models\Configuraciones\Categorias;
use Illuminate\Http\Request;


class CategoriasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get("search");

        //este hace la query a roles para filtrar por nombre con una paginacion de 25
        $categorias = Categorias::where("descripcion","like","%".$search."%")->orderBy("id","asc")->paginate(25);
        return response()->json([
           "total" => $categorias->total(),

           "categorias" => $categorias->map(function($categoria){
               return ([
                   "id" => $categoria->id,
                   "descripcion" => $categoria->descripcion,
                   "estatus" => $categoria->estatus,
                   //este tambien es valido
               //$puestos = Puesto::where('categoria_id', $categoria->id)->pluck("descripcion");
                   "created_at" => $categoria->created_at->format("Y-m-d h:i A"),
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
        $IS_CATEGORIA = Categorias::where("descripcion",$request->descripcion)->first();
        if ($IS_CATEGORIA) {
            return response()->json([
                "message" => 403,
                "message_text" => "Esta categoria ya existe"
            ]);
        }

        $categoria = Categorias::create([
            'guard_name' => 'api',
            'descripcion' => $request->descripcion,
        ]);

        return response()->json([
            "message" => 200,
            "categoria" => [
                "id" => $categoria->id,
                "descripcion" => $categoria->descripcion,
                "estatus" => 1,
                "created_at" => $categoria->created_at->format("Y-m-d h:i A"),
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
        $IS_CATEGORIA = Categorias::where("descripcion",$request->descripcion)->where("id","<>",$id)->first();
        if ($IS_CATEGORIA) {
            return response()->json([
                "message" => 403,
                "message_text" => "Esta categoria ya existe"
            ]);
        }

        $categoria = Categorias::findOrFail($id);
        $categoria->update($request->all());

        return response()->json([
            "message" => 200,
            "categoria" => [
                "id" => $categoria->id,
                "descripcion" => $categoria->descripcion,
                "estatus" => 1,
                "created_at" => $categoria->created_at->format("Y-m-d h:i A"),
            ]
        ]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $categoria = Categorias::findOrFail($id);
            $categoria->delete(); // Elimina y, gracias a ON DELETE CASCADE, los puestos también se eliminan

            return response()->json([
                "message" => 200,
                "message_text" => "Categoria eliminada correctamente."
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "message" => 500,
                "message_text" => "Error al eliminar la categoria.",
                "error" => $e->getMessage() // Opcional: muestra detalles del error (útil en desarrollo)
            ], 500);
        }
    }
}
