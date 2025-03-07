import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PuestosRoutingModule } from './puestos-routing.module';
import { PuestosComponent } from './puestos.component';
import { CreatePuestosComponent } from './create-puestos/create-puestos.component';
import { DeletePuestosComponent } from './delete-puestos/delete-puestos.component';
import { EditPuestosComponent } from './edit-puestos/edit-puestos.component';
import { ListPuestosComponent } from './list-puestos/list-puestos.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';


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
    PuestosRoutingModule,
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
export class PuestosModule { }
