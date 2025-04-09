import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { CreateUsuarioComponent } from './create-usuario/create-usuario.component';
import { EditUsuarioComponent } from './edit-usuario/edit-usuario.component';
import { DeleteUsuarioComponent } from './delete-usuario/delete-usuario.component';
import { ListUsuariosComponent } from './list-usuarios/list-usuarios.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';


@NgModule({
  declarations: [
    UsuariosComponent,
    CreateUsuarioComponent,
    EditUsuarioComponent,
    DeleteUsuarioComponent,
    ListUsuariosComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
        HttpClientModule,
                FormsModule,
                NgbModule,
                ReactiveFormsModule,
                InlineSVGModule,
                NgbModalModule,
                NgbPaginationModule,
  ]
})
export class UsuariosModule { }
