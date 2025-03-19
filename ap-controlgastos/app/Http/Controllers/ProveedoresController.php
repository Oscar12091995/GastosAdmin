<?php

namespace App\Http\Controllers;

use App\Models\Proveedores;
use Illuminate\Http\Request;

class ProveedoresController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get("search");

        //este hace la query a roles para filtrar por nombre con una paginacion de 25
        $proveedores = Proveedores::where("nombre","like","%".$search."%")->orderBy("id","asc")->paginate(25);
        return response()->json([
           "total" => $proveedores->total(),

           "proveedores" => $proveedores->map(function($proveedor){
               return ([
                   "id" => $proveedor->id,
                   "nombre" => $proveedor->nombre,
                   "direccion" => $proveedor->direccion,
                   "telefono" => $proveedor->telefono,
                   "correo" => $proveedor->correo,
                   "rfc" => $proveedor->rfc,
                   "estatus" => $proveedor->estatus,
                   //este tambien es valido
               //$puestos = Puesto::where('proveedor_id', $proveedor->id)->pluck("descripcion");
                   "created_at" => $proveedor->created_at->format("Y-m-d h:i A"),
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
        $IS_PROVEEDOR = Proveedores::where("descripcion",$request->descripcion)->first();
        if ($IS_PROVEEDOR) {
            return response()->json([
                "message" => 403,
                "message_text" => "Esta proveedor ya existe"
            ]);
        }

        $proveedor = Proveedores::create([
            'guard_name' => 'api',
            'nombre' => $request->nombre,
            'direccion' => $request->direccion,
            'telefono' => $request->telefono,
            'correo' => $request->correo,
            'rfc' => $request->rfc
        ]);

        return response()->json([
            "message" => 200,
            "proveedor" => [
                "id" => $proveedor->id,
                "nombre" => $proveedor->nombre,
                "direccion" => $proveedor->direccion,
                "telefono" => $proveedor->telefono,
                "correo" => $proveedor->correo,
                "rfc" => $proveedor->rfc,
                "estatus" => 1,
                "created_at" => $proveedor->created_at->format("Y-m-d h:i A"),
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
        $IS_PROVEEDOR = Proveedores::where("descripcion",$request->descripcion)->where("id","<>",$id)->first();
        if ($IS_PROVEEDOR) {
            return response()->json([
                "message" => 403,
                "message_text" => "Esta marca ya existe"
            ]);
        }

        $proveedor = Proveedores::findOrFail($id);
        $proveedor->update($request->all());

        return response()->json([
            "message" => 200,
            "proveedor" => [
                "id" => $proveedor->id,
                "nombre" => $proveedor->nombre,
                "direccion" => $proveedor->direccion,
                "telefono" => $proveedor->telefono,
                "correo" => $proveedor->correo,
                "rfc" => $proveedor->rfc,
                "estatus" => 1,
                "created_at" => $proveedor->created_at->format("Y-m-d h:i A"),
            ]
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $proveedor = Proveedores::findOrFail($id);
            $proveedor->delete(); // Elimina y, gracias a ON DELETE CASCADE, los puestos también se eliminan

            return response()->json([
                "message" => 200,
                "message_text" => "Proveedor eliminado correctamente."
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "message" => 500,
                "message_text" => "Error al eliminar el Proveedor.",
                "error" => $e->getMessage() // Opcional: muestra detalles del error (útil en desarrollo)
            ], 500);
        }
    }
}
