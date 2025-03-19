import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { CategoriasComponent } from './categorias.component';
import { CreateCategoriasComponent } from './create-categorias/create-categorias.component';
import { EditCategoriasComponent } from './edit-categorias/edit-categorias.component';
import { ListCategoriasComponent } from './list-categorias/list-categorias.component';
import { DeleteCategoriasComponent } from './delete-categorias/delete-categorias.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';


@NgModule({
  declarations: [
    CategoriasComponent,
    CreateCategoriasComponent,
    EditCategoriasComponent,
    ListCategoriasComponent,
    DeleteCategoriasComponent
  ],
  imports: [
    CommonModule,
    CategoriasRoutingModule,
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
export class CategoriasModule { }
