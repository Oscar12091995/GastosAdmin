<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Departamento extends Model
{
    use HasFactory;

    protected $fillable = ['descripcion','estatus','usuario_registro'];

    public function puestos(){
        return $this->hasMany(Puestos::class);
    }

    public function empleados(){
        return $this->hasMany(Empleados::class);
    }
}
