import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleadosRoutingModule } from './empleados-routing.module';
import { CreateEmpleadosComponent } from './create-empleados/create-empleados.component';
import { EditEmpleadosComponent } from './edit-empleados/edit-empleados.component';
import { ListEmpleadosComponent } from './list-empleados/list-empleados.component';
import { DeleteEmpleadosComponent } from './delete-empleados/delete-empleados.component';
import { EmpleadosComponent } from './empleados.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';


@NgModule({
  declarations: [
    CreateEmpleadosComponent,
    EditEmpleadosComponent,
    ListEmpleadosComponent,
    DeleteEmpleadosComponent,
    EmpleadosComponent
  ],
  imports: [
    CommonModule,
    EmpleadosRoutingModule,
    //importaciones necesarias para trabajar con metronic
          HttpClientModule,
            FormsModule,
            NgbModule,
            ReactiveFormsModule,
            InlineSVGModule,
            NgbModalModule,
            NgbPaginationModule,
  ]
})
export class EmpleadosModule { }
