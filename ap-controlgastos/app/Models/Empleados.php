<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Empleados extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'nombre',
        'appaterno',
        'apmaterno',
        'curp',
        'rfc',
        'seguro_social',
        'domicilio',
        'colonia',
        'municipio',
        'estatus',
        'avatar',
        'genero',
        'fecha_ingreso',
        'departamento_id',
        'puesto_id'
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

     //para el cambio de zona horaria en el created
     public function setCreatedAt($value)
     {
         date_default_timezone_set("America/Monterrey");
         $this->attributes["created_at"] = Carbon::now();
     }
     //para el cambio de zona horaria en el update
     public function setUpdatedAt($value)
     {
         date_default_timezone_set("America/Monterrey");
         $this->attributes["updated_at"] = Carbon::now();
     }
}
