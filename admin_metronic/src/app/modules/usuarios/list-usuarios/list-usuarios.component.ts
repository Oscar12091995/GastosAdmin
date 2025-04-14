import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuariosService } from '../service/usuarios.service';
import Swal from 'sweetalert2';
import { CreateUsuarioComponent } from '../create-usuario/create-usuario.component';
import { EditUsuarioComponent } from '../edit-usuario/edit-usuario.component';

@Component({
  selector: 'app-list-usuarios',
  templateUrl: './list-usuarios.component.html',
  styleUrls: ['./list-usuarios.component.scss']
})
export class ListUsuariosComponent {
  search:string = '';
  isLoading:any;
  USUARIOS:any = [];
  ROLES:any = [];
  //para el inicio de la paginacion
  totalPages:number = 0;
  currentPage:number = 1;

   constructor(
         public modalService: NgbModal,
         public usuarioService: UsuariosService,
    ){

    }

    ngOnInit(): void{
      //para renderizar el list de la perticion del servicio al abrir la ventana
      this.isLoading = this.usuarioService.isLoading$;
      this.listUsuarios();
      this.listroles();
    }



     listUsuarios(page = 1){
        this.usuarioService.listUsuarios(page,this.search).subscribe((resp:any ) => {
          console.log(resp);
          //datos relacionados con el api que se obtienen al enviar por url
          this.USUARIOS = resp.usuarios;
          this.totalPages = resp.total;
          this.currentPage = page;
        })
      }

      listroles(){
        this.usuarioService.listRoles().subscribe((resp:any ) => {
          console.log(resp);
          //datos relacionados con el api que se obtienen al enviar por url
          this.ROLES = resp.roles;

        })
      }
      //este metodo escucha cuando se adelanta una pagina de la apginacion
      loadPage($event:any){
        this.listUsuarios($event);
      }

      //se crea el metodo de crear rol, donde se hace referencia al modal service y se declaran sus objetos
        createUsuario(){
          const modalRef = this.modalService.open(CreateUsuarioComponent,{centered: true, size: 'lg'});
          modalRef.componentInstance.ROLES = this.ROLES;
          //este nos sirve oara recibir lo que acabamos de guardar y pushamos el rol creado para que se actualice
          modalRef.componentInstance.UsuarioC.subscribe((usuario:any) => {
            this.USUARIOS.unshift(usuario);
          })
        }

        editUsuario(USERS:any){
          const modalRef = this.modalService.open(EditUsuarioComponent,{centered: true, size: 'lg'});
          modalRef.componentInstance.USUARIO_SELECTED = USERS;
          modalRef.componentInstance.ROLES = this.ROLES;
          //este nos sirve oara recibir lo que acabamos de guardar y pushamos el rol creado para que se actualice
          modalRef.componentInstance.UsuarioE.subscribe((usuario:any) => {
            //aqui ya buscamos debido a que no es un nuevo registro
            let INDEX = this.USUARIOS.findIndex((user:any) => user.id == USERS.id );
            if (INDEX != -1) {
              this.USUARIOS[INDEX] = usuario;
            }
            //this.ROLES.unshift(role);
          })
        }

        //este metodo elimina con swwet alert en la vista de list
        deleteUsuario(USUARIO: any) {
          Swal.fire({
            title: `¿Eliminar el siguiente usuario: ${USUARIO.nombre}?`,
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
              this.usuarioService.deleteUsuario(USUARIO.id).subscribe((resp: any) => {
                console.log(USUARIO.id);
                if (resp.message == 403) {
                  Swal.fire('Error', resp.message_text, 'error');
                } else {
                  Swal.fire('Eliminado', 'El usuario ha sido eliminado con éxito', 'success');
                  this.USUARIOS = this.USUARIOS.filter((usuario: any) => usuario.id !== USUARIO.id); // Elimina de la lista
                }
              });
            }
          });
        }
}
