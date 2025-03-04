<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class PermissionsSeeder extends Seeder
{
    /**
     * Create the initial roles and permissions.
     *
     * @return void
     */
    public function run()
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // create permisos con seeders
        Permission::create(['guard_name' => 'api','name' => 'register_role']);
        Permission::create(['guard_name' => 'api','name' => 'edit_role']);
        Permission::create(['guard_name' => 'api','name' => 'delete_role']);
        //create permisos de registro de usuarios
        Permission::create(['guard_name' => 'api','name' => 'register_user']);
        Permission::create(['guard_name' => 'api','name' => 'edit_user']);
        Permission::create(['guard_name' => 'api','name' => 'delete_user']);
        //create permisos de registro de empleados
        Permission::create(['guard_name' => 'api','name' => 'register_empleado']);
        Permission::create(['guard_name' => 'api','name' => 'edit_empleado']);
        Permission::create(['guard_name' => 'api','name' => 'delete_empleado']);
        Permission::create(['guard_name' => 'api','name' => 'list_empleado']);
        //create permisos de registro de departamentos
        Permission::create(['guard_name' => 'api','name' => 'register_departamento']);
        Permission::create(['guard_name' => 'api','name' => 'edit_departamento']);
        Permission::create(['guard_name' => 'api','name' => 'delete_departamento']);
        //create permisos de registro para puestos de trabajo
        Permission::create(['guard_name' => 'api','name' => 'register_puesto']);
        Permission::create(['guard_name' => 'api','name' => 'edit_puesto']);
        Permission::create(['guard_name' => 'api','name' => 'delete_puesto']);

        // create roles and assign existing permissions
        // $role1 = Role::create(['guard_name' => 'api','name' => 'writer']);
        // $role1->givePermissionTo('edit articles');
        // $role1->givePermissionTo('delete articles');

        // $role2 = Role::create(['guard_name' => 'api','name' => 'admin']);
        // $role2->givePermissionTo('publish articles');
        // $role2->givePermissionTo('unpublish articles');

        $role1 = Role::create(['guard_name' => 'api', 'name' => 'Super-Admin']);
        // gets all permissions via Gate::before rule; see AuthServiceProvider

        // create demo users
        // $user = \App\Models\User::factory()->create([
        //     'name' => 'Example User',
        //     'email' => 'test@example.com',
        //     'password' => bcrypt("12345678"),
        // ]);
        // $user->assignRole($role1);

        // $user = \App\Models\User::factory()->create([
        //     'name' => 'Example Admin User',
        //     'email' => 'admin@example.com',
        //     'password' => bcrypt("12345678"),
        // ]);
        // $user->assignRole($role2);

        $user = \App\Models\User::factory()->create([
            'name' => 'Super-Admin User',
            'email' => 'prueba@email.com',
            'password' => bcrypt("12345678"),
        ]);
        $user->assignRole($role1);
    }
}
