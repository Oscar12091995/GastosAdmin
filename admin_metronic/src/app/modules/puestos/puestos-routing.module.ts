import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PuestosComponent } from './puestos.component';
import { ListPuestosComponent } from './list-puestos/list-puestos.component';

const routes: Routes = [
  {
    path: '',
        component: PuestosComponent,
        children: [
            {
              //se agrega el path list y se importa el component de mismo nombre
              path: 'list',
              component: ListPuestosComponent
            }
        ]
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PuestosRoutingModule { }
