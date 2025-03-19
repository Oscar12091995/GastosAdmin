<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Marcas extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected  $fillable = [
        'descripcion',
        'estatus',
        'usuario_registro'
    ];

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
