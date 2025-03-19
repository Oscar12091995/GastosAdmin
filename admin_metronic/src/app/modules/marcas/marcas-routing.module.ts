import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarcasComponent } from './marcas.component';
import { ListMarcasComponent } from './list-marcas/list-marcas.component';

const routes: Routes = [{
  path: '',
  component: MarcasComponent,
  children: [
    {
      //se agrega el path list y se importa el component de mismo nombre
      path: 'list',
      component: ListMarcasComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarcasRoutingModule { }
