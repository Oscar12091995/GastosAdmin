<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Puestos extends Model
{
    use HasFactory;

    protected $fillable = ['descripcion','estatus', 'departamento_id', 'usuario_registro'];

    public function departamento(){
        return $this->belongsTo(Departamento::class);
    }

    public function empleados(){
        return $this->hasMany(Empleados::class);
    }
}
