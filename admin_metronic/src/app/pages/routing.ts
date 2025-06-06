import { Routes } from '@angular/router';
import { CategoriasModule } from '../modules/categorias/categorias.module';

const Routing: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'builder',
    loadChildren: () => import('./builder/builder.module').then((m) => m.BuilderModule),
  },
  {
    path: 'crafted/pages/profile',
    loadChildren: () => import('../modules/profile/profile.module').then((m) => m.ProfileModule),
    // data: { layout: 'light-sidebar' },
  },
  {
    path: 'crafted/account',
    loadChildren: () => import('../modules/account/account.module').then((m) => m.AccountModule),
    // data: { layout: 'dark-header' },
  },
  {
    path: 'crafted/pages/wizards',
    loadChildren: () => import('../modules/wizards/wizards.module').then((m) => m.WizardsModule),
    // data: { layout: 'light-header' },
  },
  {
    path: 'crafted/widgets',
    loadChildren: () => import('../modules/widgets-examples/widgets-examples.module').then((m) => m.WidgetsExamplesModule),
    // data: { layout: 'light-header' },
  },
  {
    path: 'apps/chat',
    loadChildren: () => import('../modules/apps/chat/chat.module').then((m) => m.ChatModule),
    // data: { layout: 'light-sidebar' },
  },
  {
    path: 'apps/users',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'apps/roles',
    loadChildren: () => import('./role/role.module').then((m) => m.RoleModule),
  },
  {
    path: 'apps/permissions',
    loadChildren: () => import('./permission/permission.module').then((m) => m.PermissionModule),
  },
  //agregar url validas para utilizar en plantilla metronic con mis modulos
  {
    path: 'roles',
    loadChildren: () => import('../modules/roles/roles.module').then((m) => m.RolesModule),
  },
  //link para ir a departamentos
  {
    path: 'departamentos',
    loadChildren: () => import('../modules/departamentos/departamentos.module').then((m) => m.DepartamentosModule),
  },
  {
    path: 'puestos',
    loadChildren: () => import('../modules/puestos/puestos.module').then((m) => m.PuestosModule),
  },
  {
    //categorias
    path: 'categorias',
    loadChildren: () => import('../modules/categorias/categorias.module').then((m) => m.CategoriasModule),
  },
  {
    //marcas
    path: 'marcas',
    loadChildren: () => import('../modules/marcas/marcas.module').then((m) => m.MarcasModule),
  },
  {
    //proveedores
    //seguirle en crud de proveedoresse hizo solo ellist falta el create y el edit
    path: 'proveedores',
    loadChildren: () => import('../modules/proveedores/proveedores.module').then((m) => m.ProveedoresModule),
  },
  {
    path: 'empleados',
    loadChildren:() => import('../modules/empleados/empleados.module').then((m) => m.EmpleadosModule),
  },
  //usuarios
  {
    path: 'usuarios',
    loadChildren: () => import('../modules/usuarios/usuarios.module').then((m) => m.UsuariosModule),
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
