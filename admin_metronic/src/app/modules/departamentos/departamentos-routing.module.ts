import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartamentosComponent } from './departamentos.component';
import { ListDepartamentosComponent } from './list-departamentos/list-departamentos.component';

const routes: Routes = [{
  path: '',
      component: DepartamentosComponent,
      children: [
          {
            //se agrega el path list y se importa el component de mismo nombre
            path: 'list',
            component: ListDepartamentosComponent
          }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartamentosRoutingModule { }
