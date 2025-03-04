import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateRolesComponent } from '../create-roles/create-roles.component';
import { RolesService } from '../service/roles.service';
import { EditRolesComponent } from '../edit-roles/edit-roles.component';
import { DeleteRolesComponent } from '../delete-roles/delete-roles.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-roles',
  templateUrl: './list-roles.component.html',
  styleUrls: ['./list-roles.component.scss']
})
export class ListRolesComponent {
  search:string = '';
  ROLES:any = [];
  isLoading:any;
  //para el inicio de la paginacion
  totalPages:number = 0;
  currentPage:number = 1;
  //estructura necesaria, se exporta el servicio en estecaso es el modal
  constructor(
    public modalService: NgbModal,
    public rolesService: RolesService,
  ){

  }
//necesario se hace un Init en el componente
  ngOnInit(): void{
    //para renderizar el list de la perticion del servicio al abrir la ventana
    this.isLoading = this.rolesService.isLoading$;
    this.listRoles();
  }

  listRoles(page = 1){
    this.rolesService.listRoles(page,this.search).subscribe((resp:any ) => {
      console.log(resp);


      //datos relacionados con el api que se obtienen al enviar por url
      this.ROLES = resp.roles;
      this.totalPages = resp.total;
      this.currentPage = page;
    })
  }
  //este metodo escucha cuando se adelanta una pagina de la apginacion
  loadPage($event:any){
    this.listRoles($event);
  }
//se crea el metodo de crear rol, donde se hace referencia al modal service y se declaran sus objetos
  createRol(){
    const modalRef = this.modalService.open(CreateRolesComponent,{centered: true, size: 'md'});

    //este nos sirve oara recibir lo que acabamos de guardar y pushamos el rol creado para que se actualice
    modalRef.componentInstance.RoleC.subscribe((role:any) => {
      this.ROLES.unshift(role);
    })
  }

  editRole(ROL:any){
    const modalRef = this.modalService.open(EditRolesComponent,{centered: true, size: 'md'});
    modalRef.componentInstance.ROLE_SELECTED = ROL;
    //este nos sirve oara recibir lo que acabamos de guardar y pushamos el rol creado para que se actualice
    modalRef.componentInstance.RoleE.subscribe((role:any) => {
      //aqui ya buscamos debido a que no es un nuevo registro
      let INDEX = this.ROLES.findIndex((rol:any) => rol.id == ROL.id );
      if (INDEX != -1) {
        this.ROLES[INDEX] = role;
      }
      //this.ROLES.unshift(role);
    })
  }

  //este metodo elimina con swwet alert en la vista de list
  deleteRole(ROL: any) {
    Swal.fire({
      title: `¿Eliminar Rol: ${ROL.name}?`,
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.rolesService.deleteRole(ROL.id).subscribe((resp: any) => {
          if (resp.message == 403) {
            Swal.fire('Error', resp.message_text, 'error');
          } else {
            Swal.fire('Eliminado', 'El rol ha sido eliminado con éxito', 'success');
            this.ROLES = this.ROLES.filter((rol: any) => rol.id !== ROL.id); // Elimina de la lista
          }
        });
      }
    });
  }

  // deleteRole(ROL:any){
  //   const modalRef = this.modalService.open(DeleteRolesComponent,{centered: true, size: 'md'});
  //   modalRef.componentInstance.ROLE_SELECTED = ROL;
  //   //este nos sirve oara recibir lo que acabamos de guardar y pushamos el rol creado para que se actualice
  //   modalRef.componentInstance.RoleD.subscribe((role:any) => {
  //     //aqui ya buscamos debido a que no es un nuevo registro
  //     let INDEX = this.ROLES.findIndex((rol:any) => rol.id == ROL.id );
  //     if (INDEX != -1) {
  //       //para remover el rool
  //       this.ROLES.splice(INDEX,1);
  //     }
  //     //this.ROLES.unshift(role);
  //   })
  // }
}
