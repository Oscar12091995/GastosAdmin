import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriasService } from '../service/categorias.service';
import { CreateCategoriasComponent } from '../create-categorias/create-categorias.component';
import { EditCategoriasComponent } from '../edit-categorias/edit-categorias.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-list-categorias',
  templateUrl: './list-categorias.component.html',
  styleUrls: ['./list-categorias.component.scss']
})
export class ListCategoriasComponent {
  search:string = '';
  CATEGORIAS:any = [];
  isLoading:any;
  //para el inicio de la paginacion
  totalPages:number = 0;
  currentPage:number = 1;

   constructor(
         public modalService: NgbModal,
         public categoriasService: CategoriasService,
    ){

    }

    ngOnInit(): void{
      //para renderizar el list de la perticion del servicio al abrir la ventana
      this.isLoading = this.categoriasService.isLoading$;
      this.listCategorias();
    }

    listCategorias(page = 1){
      this.categoriasService.listCategorias(page,this.search).subscribe((resp:any ) => {
        console.log(resp);

        //datos relacionados con el api que se obtienen al enviar por url
        this.CATEGORIAS = resp.categorias;
        this.totalPages = resp.total;
        this.currentPage = page;
      })
    }

     //este metodo escucha cuando se adelanta una pagina de la apginacion
  loadPage($event:any){
    this.listCategorias($event);
  }

  //se crea el metodo de crear rol, donde se hace referencia al modal service y se declaran sus objetos
      createCategoria(){
        const modalRef = this.modalService.open(CreateCategoriasComponent,{centered: true, size: 'md'});

        //este nos sirve oara recibir lo que acabamos de guardar y pushamos el rol creado para que se actualice
        modalRef.componentInstance.CategoriaCreate.subscribe((categoria:any) => {
          this.CATEGORIAS.unshift(categoria);
        })
      }

       editCategoria(CATEGORIES:any){
            const modalRef = this.modalService.open(EditCategoriasComponent,{centered: true, size: 'md'});
            modalRef.componentInstance.CATEGORIA_SELECTED = CATEGORIES;
            //este nos sirve oara recibir lo que acabamos de guardar y pushamos el rol creado para que se actualice
            modalRef.componentInstance.CategoriaEdit.subscribe((categoria:any) => {
              //aqui ya buscamos debido a que no es un nuevo registro
              let INDEX = this.CATEGORIAS.findIndex((categorie:any) => categorie.id == CATEGORIES.id );
              if (INDEX != -1) {
                this.CATEGORIAS[INDEX] = categoria;
              }
              //this.ROLES.unshift(role);
            })
          }

           //este metodo elimina con swwet alert en la vista de list
              deleteCategoria(CATEGORIA: any) {
                Swal.fire({
                  title: `¿Eliminar Departamento: ${CATEGORIA.descripcion}?`,
                  text: "Esta acción no se puede deshacer",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#d33',
                  cancelButtonColor: '#3085d6',
                  confirmButtonText: 'Sí, eliminar',
                  cancelButtonText: 'Cancelar'
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.categoriasService.deleteCategoria(CATEGORIA.id).subscribe((resp: any) => {
                      if (resp.message == 403) {
                        Swal.fire('Error', resp.message_text, 'error');
                      } else {
                        Swal.fire('Eliminado', 'La categoría ha sido eliminado con éxito', 'success');
                        this.CATEGORIAS = this.CATEGORIAS.filter((categoria: any) => categoria.id !== CATEGORIA.id); // Elimina de la lista
                      }
                    });
                  }
                });
              }
}
