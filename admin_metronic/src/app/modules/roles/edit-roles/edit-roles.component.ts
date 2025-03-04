import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SIDEBAR } from 'src/app/config/config';
import { RolesService } from '../service/roles.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-roles',
  templateUrl: './edit-roles.component.html',
  styleUrls: ['./edit-roles.component.scss']
})
export class EditRolesComponent {
  //metodo para el metodo de salida asincrono y mandar del componente hijo al componente padre
  @Output() RoleE: EventEmitter<any> = new EventEmitter();
  //METODO PARA ENVIAR AL COMPONENTE padre al hijo  y la variable es la misma que va a recibir en el componente edit
  @Input() ROLE_SELECTED:any;

  name: string = '';
  isLoading: any;
  SIDEBAR: any = SIDEBAR;
  permissions: any = [];

  constructor(
    public modal: NgbActiveModal,
    public rolesService: RolesService,
    public toast: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.name = this.ROLE_SELECTED.name;
    this.permissions = this.ROLE_SELECTED.permission_pluck;
  }

  //metodo para la agregar los permisos de la lista de checksbox o quitar, al
  //seleccionar o al reves, quita si deselecciono
  addPermission(permiso: string) {
    let INDEX = this.permissions.findIndex((perm: string) => perm == permiso);

    if (INDEX != -1) {
      this.permissions.splice(INDEX, 1);
    } else {
      this.permissions.push(permiso);
    }
    console.log(this.permissions);
    //this.permissions.push(this.permissions);
  }

  store() {
    if (!this.name) {
      this.toast.error("Error", "El nombre es requerido");
      return false;
    }

    if (this.permissions.length == 0) {
      this.toast.error("Error", "Los permisos son requeridos");
      return false;
    }

    let data = {
      name: this.name,
      permissions: this.permissions,
    }

    this.rolesService.updateRole(this.ROLE_SELECTED.id,data).subscribe((resp: any) => {
      console.log(resp);

      //como este es la vista hija se enviaran a la vista padre que es la
      if (resp.message == 403) {
        this.toast.error("Error", resp.message_text);
      } else {
        //este sirve para emitir los cambios al crear en este caso y pasamos la variable del rol creado

        this.toast.info("Rol actualizado con exito", "Excelente", {
          //de esta forma podemos darle otra vista al toastr
          progressBar: true,
          timeOut: 1000,
          extendedTimeOut: 1000,
        });
        this.RoleE.emit(resp.role);
        //cerramos el modal al guardar y crear el rol
        this.modal.close();
      }
    })
  }
}
