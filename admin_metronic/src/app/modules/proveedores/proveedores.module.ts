import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProveedoresRoutingModule } from './proveedores-routing.module';
import { ProveedoresComponent } from './proveedores.component';

import { CreateProveedoresComponent } from './create-proveedores/create-proveedores.component';
import { EditProveedoresComponent } from './edit-proveedores/edit-proveedores.component';
import { ListProveedoresComponent } from './list-proveedores/list-proveedores.component';
import { DeleteProveedoresComponent } from './delete-proveedores/delete-proveedores.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';


@NgModule({
  declarations: [
    ProveedoresComponent,

    CreateProveedoresComponent,
    EditProveedoresComponent,
    ListProveedoresComponent,
    DeleteProveedoresComponent
  ],
  imports: [
    CommonModule,
    ProveedoresRoutingModule,
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
export class ProveedoresModule { }
