import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios.component';
import { ListUsuariosComponent } from './list-usuarios/list-usuarios.component';

const routes: Routes = [{
   path: '',
    component: UsuariosComponent,
    children: [
      {
        path: 'list',
        component: ListUsuariosComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
