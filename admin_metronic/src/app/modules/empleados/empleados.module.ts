import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleadosRoutingModule } from './empleados-routing.module';
import { CreateEmpleadosComponent } from './create-empleados/create-empleados.component';
import { EditEmpleadosComponent } from './edit-empleados/edit-empleados.component';
import { ListEmpleadosComponent } from './list-empleados/list-empleados.component';
import { DeleteEmpleadosComponent } from './delete-empleados/delete-empleados.component';


@NgModule({
  declarations: [
    CreateEmpleadosComponent,
    EditEmpleadosComponent,
    ListEmpleadosComponent,
    DeleteEmpleadosComponent
  ],
  imports: [
    CommonModule,
    EmpleadosRoutingModule
  ]
})
export class EmpleadosModule { }
