<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empleados extends Model
{
    use HasFactory;

    protected $fillable = ['nombre','appaterno','apmaterno','curp', 'rfc','seguro_social','domicilio',
        'colonia','municipio','estatus','fecha_ingreso','departamento_id', 'puesto_id'
    ];

    public function departamento(){
        return $this->belongsTo(Departamento::class);
    }

    public function puesto(){
        return $this->belongsTo(Puestos::class);
    }

    public function user(){
        return $this->hasOne(User::class);
    }
}
