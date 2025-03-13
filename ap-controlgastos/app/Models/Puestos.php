<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Puestos extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ['descripcion','estatus', 'departamento_id', 'usuario_registro'];

    public function departamento(){
        return $this->belongsTo(Departamento::class, 'departamento_id');
    }

    public function empleados(){
        return $this->hasMany(Empleados::class);
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
