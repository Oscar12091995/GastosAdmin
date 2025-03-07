<?php

namespace App\Http\Controllers;

use App\Models\Departamento;
use Illuminate\Http\Request;

class DepartamentosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get("search");

         //este hace la query a roles para filtrar por nombre con una paginacion de 25
         $departamentos = Departamento::with(["puestos"])->where("descripcion","like","%".$search."%")->orderBy("id","desc")->paginate(25);
         return response()->json([
            "total" => $departamentos->total(),

            "departamentos" => $departamentos->map(function($departamento){
                return collect([
                    "id" => $departamento->id,
                    "descripcion" => $departamento->descripcion,
                    "estatus" => $departamento->estatus,
                    //este tambien es valido
                //$puestos = Puesto::where('departamento_id', $departamento->id)->pluck("descripcion");
                    "puestos" => $departamento->puestos->pluck("descripcion"),
                    "created_at" => $departamento->created_at->format("Y-m-d h:i A"),
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
       $IS_DEPARTAMENTO = Departamento::where("descripcion",$request->descripcion)->first();
        if ($IS_DEPARTAMENTO) {
            return response()->json([
                "message" => 403,
                "message_text" => "Este departamento ya existe"
            ]);
        }

        $departamento = Departamento::create([
            'guard_name' => 'api',
            'descripcion' => $request->descripcion
        ]);

        return response()->json([
            "message" => 200,
            "departamento" => [
                "id" => $departamento->id,
                "descripcion" => $departamento->descripcion,
                "estatus" => 1,
                "puestos" => $departamento->puestos->pluck("descripcion"),
                "created_at" => $departamento->created_at->format("Y-m-d h:i A"),
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


        $IS_DEPARTAMENTO = Departamento::where("descripcion",$request->descripcion)->where("id","<>",$id)->first();
        if ($IS_DEPARTAMENTO) {
            return response()->json([
                "message" => 403,
                "message_text" => "Este departamento ya existe"
            ]);
        }

        $departamento = Departamento::findOrFail($id);
        $departamento->update($request->all());

        return response()->json([
            "message" => 200,
            "departamento" => [
                "id" => $departamento->id,
                "descripcion" => $departamento->descripcion,
                "estatus" => $departamento->estatus,
                "puestos" => $departamento->puestos->pluck("descripcion"),
                "created_at" => $departamento->created_at->format("Y-m-d h:i A"),

            ]
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // $departamento = Departamento::findOrFail($id);

        // $departamento->delete();
        // return response()->json([
        //     "message" => 200,

        // ]);

        try {
            $departamento = Departamento::findOrFail($id);
            $departamento->delete(); // Elimina y, gracias a ON DELETE CASCADE, los puestos también se eliminan

            return response()->json([
                "message" => 200,
                "message_text" => "Departamento eliminado correctamente."
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "message" => 500,
                "message_text" => "Error al eliminar el departamento.",
                "error" => $e->getMessage() // Opcional: muestra detalles del error (útil en desarrollo)
            ], 500);
        }
    }
}
