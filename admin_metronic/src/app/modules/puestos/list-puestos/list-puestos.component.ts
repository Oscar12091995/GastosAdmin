import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PuestosService } from '../service/puestos.service';
import { CreatePuestosComponent } from '../create-puestos/create-puestos.component';
import { EditPuestosComponent } from '../edit-puestos/edit-puestos.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-puestos',
  templateUrl: './list-puestos.component.html',
  styleUrls: ['./list-puestos.component.scss']
})
export class ListPuestosComponent {
  search:string = '';
  estatus: boolean = false; //
  PUESTOS:any = [];
  isLoading:any;
  //para el inicio de la paginacion
  totalPages:number = 0;
  currentPage:number = 1;

  constructor(
          public modalService: NgbModal,
           public puestosService: PuestosService,
  ){

  }

  ngOnInit(): void{
    //para renderizar el list de la perticion del servicio al abrir la ventana
    this.isLoading = this.puestosService.isLoading$;
    this.listPuestos();
  }

  listPuestos(page = 1){
    this.puestosService.listPuesto(page,this.search).subscribe((resp:any ) => {
      console.log(resp);
      //datos relacionados con el api que se obtienen al enviar por url
      this.PUESTOS = resp.puestos;
      this.totalPages = resp.total;
      this.currentPage = page;
    })
  }
  loadPage($event:any){
    this.listPuestos($event);
  }

   //se crea el metodo de crear rol, donde se hace referencia al modal service y se declaran sus objetos
      createPuesto(){
        const modalRef = this.modalService.open(CreatePuestosComponent,{centered: true, size: 'md'});

        //este nos sirve oara recibir lo que acabamos de guardar y pushamos el rol creado para que se actualice
        modalRef.componentInstance.PuestoC.subscribe((puesto:any) => {
          this.PUESTOS.unshift(puesto);
        })
      }

      editPuesto(PUESTS:any){
        const modalRef = this.modalService.open(EditPuestosComponent,{centered: true, size: 'md'});
        modalRef.componentInstance.PUESTO_SELECTED = PUESTS;
        //este nos sirve oara recibir lo que acabamos de guardar y pushamos el rol creado para que se actualice
        modalRef.componentInstance.PuestoE.subscribe((puesto:any) => {
          //aqui ya buscamos debido a que no es un nuevo registro
          let INDEX = this.PUESTOS.findIndex((puest:any) => puest.id == PUESTS.id );
          if (INDEX != -1) {
            this.PUESTOS[INDEX] = puesto;
          }
          //this.ROLES.unshift(role);
        })
      }

      //este metodo elimina con swwet alert en la vista de list
      deletePuesto(PUESTO: any) {
        Swal.fire({
          title: `¿Eliminar Departamento: ${PUESTO.descripcion}?`,
          text: "Esta acción no se puede deshacer",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.puestosService.deletePuesto(PUESTO.id).subscribe((resp: any) => {
              if (resp.message == 403) {
                Swal.fire('Error', resp.message_text, 'error');
              } else {
                Swal.fire('Eliminado', 'El puesto ha sido eliminado con éxito', 'warning');
                this.PUESTOS = this.PUESTOS.filter((departamento: any) => departamento.id !== PUESTO.id); // Elimina de la lista
              }
            });
          }
        });
      }
}
