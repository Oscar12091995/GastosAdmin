import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SIDEBAR } from 'src/app/config/config';
import { RolesService } from '../service/roles.service';

@Component({
  selector: 'app-delete-roles',
  templateUrl: './delete-roles.component.html',
  styleUrls: ['./delete-roles.component.scss']
})
export class DeleteRolesComponent {
 @Output() RoleD: EventEmitter<any> = new EventEmitter();
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


  delete() {

    this.rolesService.deleteRole(this.ROLE_SELECTED.id).subscribe((resp: any) => {
      console.log(resp);

      //como este es la vista hija se enviaran a la vista padre que es la
      if (resp.message == 403) {
        this.toast.error("Error", resp.message_text);
      } else {
        //este sirve para emitir los cambios al crear en este caso y pasamos la variable del rol creado

        this.toast.error("Rol eliminado con exito", "Excelente", {
          //de esta forma podemos darle otra vista al toastr
          progressBar: true,
          timeOut: 1000,
          extendedTimeOut: 1000,
        });
        this.RoleD.emit(resp.role);
        //cerramos el modal al guardar y crear el rol
        this.modal.close();
      }
    })
  }
}
