<?php

namespace App\Http\Controllers\Usuario;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Role;

class UserAccessController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get("search");
        $usuarios = User::where("name","like","%".$search."%")->orderBy("id","desc")->paginate(25);
        return response()->json([
           "total" => $usuarios->total(),

           "usuarios" => $usuarios->map(function($usuario){
               return collect([
                   "id" => $usuario->id,
                   "nombre" => $usuario->name,
                   "apellido" => $usuario->apellido,
                   "full_name" => $usuario->name. ' '.$usuario->apellido,
                   "email" => $usuario->email,
                   "role_id" => $usuario->role_id,
                   "role" => $usuario->role,
                   "roles" => $usuario->roles,
                   "avatar" => $usuario->avatar ? env("APP_URL")."/storage".$usuario->avatar : null,
                   "created_at" => $usuario->created_at->format("Y-m-d h:i A"),
               ]);  //return $departamento;
           }),
       ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $IS_USUARIO = User::where("email",$request->email)->first();
        if ($IS_USUARIO) {
            return response()->json([
                "message" => 403,
                "message_text" => "Este usuario ya existe"
            ]);
        }

        if ($request->hasFile("usuario_imagen")) {
            $path = Storage::putFile("usuarios", $request->file("usuario_imagen"));
            $request->request->add(["avatar" => $path]);
        }

        if ($request->password) {
            $request->request->add(["password" => bcrypt($request->password)]);
        }

        $role = Role::findOrFail($request->role_id);

        $usuario = User::create($request->all());

        $usuario->assignRole($role);

        return response()->json([
            "message" => 200,
            "usuario" => [
               "id" => $usuario->id,
                   "nombre" => $usuario->name,
                   "apellido" => $usuario->apellido,
                   "full_name" => $usuario->name. ' '.$usuario->apellido,
                   "email" => $usuario->email,
                   "role_id" => $usuario->role_id,
                   "role" => $usuario->roles,
                   "avatar" => $usuario->avatar ? env("APP_URL")."/storage".$usuario->avatar : null,
                   "created_at" => $usuario->created_at->format("Y-m-d h:i A"),
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
        $IS_USUARIO = User::where("email",$request->email)->where("id","<>",$id)->first();
        if ($IS_USUARIO) {
            return response()->json([
                "message" => 403,
                "message_text" => "Este usuario ya existe"
            ]);
        }

        $usuario = User::findOrFail($id);

        if ($request->hasFile("usuario_imagen")) {
            if ($usuario->avatar) {
                Storage::delete($usuario->avatar);
            }
            $path = Storage::putFile("usuarios", $request->file("usuario_imagen"));
            $request->request->add(["avatar" => $path]);
        }

        if ($request->password) {
            $request->request->add(["password" => bcrypt($request->password)]);
        }

        if ($request->role_id != $usuario->role_id) {
            $role_old = Role::findOrFail($usuario->role_id);
            $usuario->removeRole($role_old);

            //nuevo rol
            $role = Role::findOrFail($request->role_id);
            $usuario->assignRole($role);
        }

        $usuario->update($request->all());

        return response()->json([
            "message" => 200,
            "usuario" => [
               "id" => $usuario->id,
                   "nombre" => $usuario->name,
                   "apellido" => $usuario->apellido,
                   "full_name" => $usuario->name. ' '.$usuario->apellido,
                   "email" => $usuario->email,
                   "role_id" => $usuario->role_id,
                   "role" => $usuario->roles,
                   "avatar" => $usuario->avatar ? env("APP_URL")."/storage".$usuario->avatar : null,
                   "created_at" => $usuario->created_at->format("Y-m-d h:i A"),
            ]
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $usuario = User::where($id)->first();
        if ($usuario->avatar) {
            Storage::delete($usuario->avatar);
        }
        $usuario->delete();
        return response()->json([
            "message" => 200
        ]);
    }
}
