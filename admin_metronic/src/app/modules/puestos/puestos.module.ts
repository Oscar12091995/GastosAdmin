import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PuestosRoutingModule } from './puestos-routing.module';
import { PuestosComponent } from './puestos.component';
import { CreatePuestosComponent } from './create-puestos/create-puestos.component';
import { DeletePuestosComponent } from './delete-puestos/delete-puestos.component';
import { EditPuestosComponent } from './edit-puestos/edit-puestos.component';
import { ListPuestosComponent } from './list-puestos/list-puestos.component';


@NgModule({
  declarations: [
    PuestosComponent,
    CreatePuestosComponent,
    DeletePuestosComponent,
    EditPuestosComponent,
    ListPuestosComponent
  ],
  imports: [
    CommonModule,
    PuestosRoutingModule
  ]
})
export class PuestosModule { }
