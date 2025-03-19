import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProveedoresService } from '../service/proveedores.service';
import { CreateProveedoresComponent } from '../create-proveedores/create-proveedores.component';
import { EditProveedoresComponent } from '../edit-proveedores/edit-proveedores.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-proveedores',
  templateUrl: './list-proveedores.component.html',
  styleUrls: ['./list-proveedores.component.scss']
})
export class ListProveedoresComponent {
  search: string = '';
  PROVEEDORES: any = [];
  isLoading: any;
  //para el inicio de la paginacion
  totalPages: number = 0;
  currentPage: number = 1;

  constructor(
      public modalService: NgbModal,
      public proveedoresService: ProveedoresService,
    ) {

    }

    ngOnInit(): void {
      //para renderizar el list de la perticion del servicio al abrir la ventana
      this.isLoading = this.proveedoresService.isLoading$;
      this.listProveedores();
    }

    listProveedores(page = 1) {
      this.proveedoresService.listProveedores(page, this.search).subscribe((resp: any) => {
        console.log(resp);

        //datos relacionados con el api que se obtienen al enviar por url
        this.PROVEEDORES = resp.proveedores;
        this.totalPages = resp.total;
        this.currentPage = page;
      })
    }

     //este metodo escucha cuando se adelanta una pagina de la apginacion
  loadPage($event: any) {
    this.listProveedores($event);
  }

  //se crea el metodo de crear rol, donde se hace referencia al modal service y se declaran sus objetos
    createProveedores() {
      const modalRef = this.modalService.open(CreateProveedoresComponent, { centered: true, size: 'lg' });

      //este nos sirve oara recibir lo que acabamos de guardar y pushamos el rol creado para que se actualice
      modalRef.componentInstance.ProveedorCreate.subscribe((proveedor: any) => {
        this.PROVEEDORES.unshift(proveedor);
      })
    }

    editProveedor(PROVEEDORS: any) {
        const modalRef = this.modalService.open(EditProveedoresComponent, { centered: true, size: 'md' });
        modalRef.componentInstance.PROVEEDOR_SELECTED = PROVEEDORS;
        //este nos sirve oara recibir lo que acabamos de guardar y pushamos el rol creado para que se actualice
        modalRef.componentInstance.ProveedorEdit.subscribe((proveedor: any) => {
          //aqui ya buscamos debido a que no es un nuevo registro
          let INDEX = this.PROVEEDORES.findIndex((proveedores: any) => proveedores.id == PROVEEDORS.id);
          if (INDEX != -1) {
            this.PROVEEDORES[INDEX] = proveedor;
          }
          //this.ROLES.unshift(role);
        })
      }

        //este metodo elimina con swwet alert en la vista de list
        deleteProveedor(PROVEEDOR: any) {
          Swal.fire({
            title: `¿Eliminar el Proveedor: ${PROVEEDOR.nombre}?`,
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
              this.proveedoresService.deleteProveedor(PROVEEDOR.id).subscribe((resp: any) => {
                if (resp.message == 403) {
                  Swal.fire('Error', resp.message_text, 'error');
                } else {
                  Swal.fire('Eliminado', 'El proveedor ha sido eliminado con éxito', 'success');
                  this.PROVEEDORES = this.PROVEEDORES.filter((proveedor: any) => proveedor.id !== PROVEEDOR.id); // Elimina de la lista
                }
              });
            }
          });
        }
}
