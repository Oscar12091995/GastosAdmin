import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarcasRoutingModule } from './marcas-routing.module';
import { MarcasComponent } from './marcas.component';
import { CreateMarcasComponent } from './create-marcas/create-marcas.component';
import { EditMarcasComponent } from './edit-marcas/edit-marcas.component';
import { ListMarcasComponent } from './list-marcas/list-marcas.component';
import { DeleteMarcasComponent } from './delete-marcas/delete-marcas.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';


@NgModule({
  declarations: [
    MarcasComponent,
    CreateMarcasComponent,
    EditMarcasComponent,
    ListMarcasComponent,
    DeleteMarcasComponent
  ],
  imports: [
    CommonModule,
    MarcasRoutingModule,
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
export class MarcasModule { }
