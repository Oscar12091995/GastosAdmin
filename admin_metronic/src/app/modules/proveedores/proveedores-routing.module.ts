import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProveedoresComponent } from './proveedores.component';
import { ListProveedoresComponent } from './list-proveedores/list-proveedores.component';

const routes: Routes = [{
  path: '',
  component: ProveedoresComponent,
  children: [
    {
      //se agrega el path list y se importa el component de mismo nombre
      path: 'list',
      component: ListProveedoresComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProveedoresRoutingModule { }
