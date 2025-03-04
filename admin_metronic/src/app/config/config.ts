import { environment } from "src/environments/environment";


export const URL_SERVICIOS = environment.URL_SERVICIOS;
export const URL_BACKEND = environment.URL_BACKEND;
export const URL_FRONTED = environment.URL_FRONTED;

export const SIDEBAR:any = [
  //roles
  {
    'name': 'Roles',
    'permisos': [
      {
        name:'Registrar',
        permiso: 'register_role',
      },
      {
        name:'Editar',
        permiso: 'edit_role',
      },
      {
        name:'Eliminar',
        permiso: 'delete_role',
      }
    ]
  },
  //usuarios
  {
    'name': 'Usuarios',
    'permisos': [
      {
        name:'Registrar',
        permiso: 'register_user',
      },
      {
        name:'Editar',
        permiso: 'edit_user',
      },
      {
        name:'Eliminar',
        permiso: 'delete_user',
      }
    ]
  },
  // {
  //   'name': 'Productos',
  //   'permisos': [
  //     {
  //       name:'Registrar',
  //       permiso: 'register_product',
  //     },
  //     {
  //       name:'Editar',
  //       permiso: 'edit_product',
  //     },
  //     {
  //       name:'Eliminar',
  //       permiso: 'delete_product',
  //     },
  //     {
  //       name:'Ver billetera de precios',
  //       permiso: 'show_wallet_price_product',
  //     },
  //     {
  //       name:'Nuevo precio',
  //       permiso: 'register_wallet_price_product',
  //     },
  //     {
  //       name:'Editar precio',
  //       permiso: 'edit_wallet_price_product',
  //     },
  //     {
  //       name:'Eliminar precio',
  //       permiso: 'delete_wallet_price_product',
  //     },
  //   ]
  // },
  // {
  //   'name': 'Proveedores',
  //   'permisos': [
  //     {
  //       name:'Registrar',
  //       permiso: 'register_proveedores',
  //     },
  //     {
  //       name:'Editar',
  //       permiso: 'edit_rpveedores',
  //     },
  //     {
  //       name:'Eliminar',
  //       permiso: 'delete_proveedores',
  //     },
  //   ]
  // },
  {
    'name': 'Consumos Almacen',
    'permisos': [
      // {
      //   name:'Registrar',
      //   permiso: 'register_consumos',
      // },
      // {
      //   name:'Editar',
      //   permiso: 'edit_consumos',
      // },
      // {
      //   name:'Eliminar',
      //   permiso: 'delete_consumos',
      // },
      {
        name:'Egreso (Salida de productos)',
        permiso: 'egreso',
      },
  //     {
  //       name:'Ingreso',
  //       permiso: 'ingreso',
  //     },
      {
        name:'Cierre de egresos',
        permiso: 'close_egresos',
      },
    ]
   },
   //departamentos
  {
    'name': 'Departamentos',
    'permisos': [
      {
        name:'Registrar',
        permiso: 'register_departamento',
      },
      {
        name:'Editar',
        permiso: 'edit_departamento',
      },
      {
        name:'Eliminar',
        permiso: 'delete_departamento',
      },
    ]
  },
  //puestos
  {
    'name': 'Puestos',
    'permisos': [
      {
        name:'Registrar',
        permiso: 'register_puesto',
      },
      {
        name:'Editar',
        permiso: 'edit_puesto',
      },
      {
        name:'Eliminar',
       permiso: 'delete_puesto',
      },
    ]
  },
  //empleados
  {
    'name': 'Empleados',
    'permisos': [
      {
        name:'Registrar',
        permiso: 'register_empleado',
      },
      {
        name:'Editar',
        permiso: 'edit_empleado',
      },
      {
        name:'Eliminar',
        permiso: 'delete_empleado',
      },
      {
        name:'Reporte',
        permiso: 'list_empleado',
      },
    ]
  },
  // {
  //   'name': 'Cronograma',
  //   'permisos': [
  //     {
  //       name:'Disponible',
  //       permiso: 'cronograma',
  //     },
  //   ]
  // },
  // {
  //   'name': 'Comisiones',
  //   'permisos': [
  //     {
  //       name:'Disponible',
  //       permiso: 'comisiones',
  //     },
  //   ]
  // },
  //compras
  {
    'name': 'Compras',
    'permisos': [
      {
        name:'Registrar',
        permiso: 'register_compra',
      },
      {
        name:'Editar',
        permiso: 'edit_compra',
      },
      {
        name:'Eliminar',
        permiso: 'delete_compra',
      },
    ]
  },
  //unidades camiones
  {
    'name': 'Unidades',
    'permisos': [
      {
        name:'Registrar',
        permiso: 'register_unidades',
      },
      {
        name:'Editar',
        permiso: 'edit_unidades',
      },
      {
        name:'Eliminar',
        permiso: 'delete_unidades',
      },
    ]
  },
  //salidas de almacen
  {
    'name': 'Salidas Almacen',
    'permisos': [
      {
        name:'Gastos Almacen',
        permiso: 'reporte_almacen',
      },
      {
        name:'Gastos Talles',
        permiso: 'reporte_taller',
      },
      // {
      //   name:'Eliminar',
      //   permiso: 'delete_unidades',
      // },
    ]
  },
  //gastos de taller
  {
    'name': 'Gastos Taller',
    'permisos': [
      {
        name:'Registrar',
        permiso: 'register_departamentos',
      },
      {
        name:'Editar',
        permiso: 'edit_departamentos',
      },
      {
        name:'Eliminar',
        permiso: 'delete_departamentos',
      },
    ]
  },
];
