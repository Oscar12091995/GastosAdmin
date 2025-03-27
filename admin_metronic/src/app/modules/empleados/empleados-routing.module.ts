import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadosComponent } from './empleados.component';
import { ListEmpleadosComponent } from './list-empleados/list-empleados.component';
import { CreateEmpleadosComponent } from './create-empleados/create-empleados.component';
import { EditEmpleadosComponent } from './edit-empleados/edit-empleados.component';

const routes: Routes = [{
  path: '',
  component: EmpleadosComponent,
  children: [
    {
      path: 'list',
      component: ListEmpleadosComponent
    },
    {
      path: 'registro',
      component: CreateEmpleadosComponent
    },
    {
      path: 'editar/:id',
      component: EditEmpleadosComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadosRoutingModule { }
