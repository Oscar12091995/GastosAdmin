<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('empleados', function (Blueprint $table) {
            $table->id();
            $table->string('nombre')->nullable();
            $table->string('appaterno')->nullable();
            $table->string('apmaterno')->nullable();

            $table->string('curp')->nullable();
            $table->string('rfc')->nullable();
            $table->string('seguro_social')->nullable();
            $table->string('domicilio')->nullable();
            $table->string('colonia')->nullable();
            $table->string('municipio')->nullable();
            $table->tinyInteger('estatus')->default(1);
            $table->date('fecha_ingreso')->nullable();

            $table->unsignedBigInteger('departamento_id')->nullable();

            $table->unsignedBigInteger('puesto_id')->nullable();

            $table->foreign('departamento_id')->references('id')->on('departamentos')->onDelete('set null');
            $table->foreign('puesto_id')->references('id')->on('puestos')->onDelete('set null');
            $table->timestamps();
            $table->softDeletes('deleted_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('empleados');
    }
};
