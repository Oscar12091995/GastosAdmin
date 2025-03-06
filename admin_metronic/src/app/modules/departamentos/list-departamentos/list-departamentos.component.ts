import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DepartamentosService } from '../service/departamentos.service';
import { CreateDepartamentosComponent } from '../create-departamentos/create-departamentos.component';
import { EditDepartamentosComponent } from '../edit-departamentos/edit-departamentos.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-departamentos',
  templateUrl: './list-departamentos.component.html',
  styleUrls: ['./list-departamentos.component.scss']
})
export class ListDepartamentosComponent {
  search:string = '';
  DEPARTAMENTOS:any = [];
  isLoading:any;
  //para el inicio de la paginacion
  totalPages:number = 0;
  currentPage:number = 1;

  constructor(
       public modalService: NgbModal,
       public departamentosService: DepartamentosService,
  ){

  }

  ngOnInit(): void{
    //para renderizar el list de la perticion del servicio al abrir la ventana
    this.isLoading = this.departamentosService.isLoading$;
    this.listDepartamentos();
  }

  listDepartamentos(page = 1){
    this.departamentosService.listDepartamentos(page,this.search).subscribe((resp:any ) => {
      console.log(resp);


      //datos relacionados con el api que se obtienen al enviar por url
      this.DEPARTAMENTOS = resp.departamentos;
      this.totalPages = resp.total;
      this.currentPage = page;
    })
  }
  //este metodo escucha cuando se adelanta una pagina de la apginacion
  loadPage($event:any){
    this.listDepartamentos($event);
  }

  //se crea el metodo de crear rol, donde se hace referencia al modal service y se declaran sus objetos
    createDepartamento(){
      const modalRef = this.modalService.open(CreateDepartamentosComponent,{centered: true, size: 'md'});

      //este nos sirve oara recibir lo que acabamos de guardar y pushamos el rol creado para que se actualice
      modalRef.componentInstance.DepartamentoC.subscribe((departamento:any) => {
        this.DEPARTAMENTOS.unshift(departamento);
      })
    }

    editDepartamento(DEPARTAMENTS:any){
      const modalRef = this.modalService.open(EditDepartamentosComponent,{centered: true, size: 'md'});
      modalRef.componentInstance.DEPARTAMENTO_SELECTED = DEPARTAMENTS;
      //este nos sirve oara recibir lo que acabamos de guardar y pushamos el rol creado para que se actualice
      modalRef.componentInstance.DepartamentoE.subscribe((departamento:any) => {
        //aqui ya buscamos debido a que no es un nuevo registro
        let INDEX = this.DEPARTAMENTOS.findIndex((departament:any) => departament.id == DEPARTAMENTS.id );
        if (INDEX != -1) {
          this.DEPARTAMENTOS[INDEX] = departamento;
        }
        //this.ROLES.unshift(role);
      })
    }

    //este metodo elimina con swwet alert en la vista de list
    deleteDepartamento(DEPARTAMENTO: any) {
      Swal.fire({
        title: `¿Eliminar Departamento: ${DEPARTAMENTO.descripcion}?`,
        text: "Esta acción no se puede deshacer",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.departamentosService.deleteDepartamento(DEPARTAMENTO.id).subscribe((resp: any) => {
            if (resp.message == 403) {
              Swal.fire('Error', resp.message_text, 'error');
            } else {
              Swal.fire('Eliminado', 'El departamento ha sido eliminado con éxito', 'success');
              this.DEPARTAMENTOS = this.DEPARTAMENTOS.filter((departamento: any) => departamento.id !== DEPARTAMENTO.id); // Elimina de la lista
            }
          });
        }
      });
    }

}
