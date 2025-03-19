import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MarcasService } from '../service/marcas.service';
import { CreateMarcasComponent } from '../create-marcas/create-marcas.component';
import { EditMarcasComponent } from '../edit-marcas/edit-marcas.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-marcas',
  templateUrl: './list-marcas.component.html',
  styleUrls: ['./list-marcas.component.scss']
})
export class ListMarcasComponent {

  search: string = '';
  MARCAS: any = [];
  isLoading: any;
  //para el inicio de la paginacion
  totalPages: number = 0;
  currentPage: number = 1;

  constructor(
    public modalService: NgbModal,
    public marcasService: MarcasService,
  ) {

  }

  ngOnInit(): void {
    //para renderizar el list de la perticion del servicio al abrir la ventana
    this.isLoading = this.marcasService.isLoading$;
    this.listMarcas();
  }

  listMarcas(page = 1) {
    this.marcasService.listMarcas(page, this.search).subscribe((resp: any) => {
      console.log(resp);

      //datos relacionados con el api que se obtienen al enviar por url
      this.MARCAS = resp.marcas;
      this.totalPages = resp.total;
      this.currentPage = page;
    })
  }

  //este metodo escucha cuando se adelanta una pagina de la apginacion
  loadPage($event: any) {
    this.listMarcas($event);
  }

  //se crea el metodo de crear rol, donde se hace referencia al modal service y se declaran sus objetos
  createMarca() {
    const modalRef = this.modalService.open(CreateMarcasComponent, { centered: true, size: 'md' });

    //este nos sirve oara recibir lo que acabamos de guardar y pushamos el rol creado para que se actualice
    modalRef.componentInstance.MarcaCreate.subscribe((marca: any) => {
      this.MARCAS.unshift(marca);
    })
  }

  editMarca(MARCS: any) {
    const modalRef = this.modalService.open(EditMarcasComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.MARCA_SELECTED = MARCS;
    //este nos sirve oara recibir lo que acabamos de guardar y pushamos el rol creado para que se actualice
    modalRef.componentInstance.MarcaEdit.subscribe((marca: any) => {
      //aqui ya buscamos debido a que no es un nuevo registro
      let INDEX = this.MARCAS.findIndex((marcs: any) => marcs.id == MARCS.id);
      if (INDEX != -1) {
        this.MARCAS[INDEX] = marca;
      }
      //this.ROLES.unshift(role);
    })
  }

  //este metodo elimina con swwet alert en la vista de list
  deleteMarca(MARCA: any) {
    Swal.fire({
      title: `¿Eliminar Departamento: ${MARCA.descripcion}?`,
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.marcasService.deleteMarca(MARCA.id).subscribe((resp: any) => {
          if (resp.message == 403) {
            Swal.fire('Error', resp.message_text, 'error');
          } else {
            Swal.fire('Eliminado', 'La categoría ha sido eliminado con éxito', 'success');
            this.MARCAS = this.MARCAS.filter((marca: any) => marca.id !== MARCA.id); // Elimina de la lista
          }
        });
      }
    });
  }
}
