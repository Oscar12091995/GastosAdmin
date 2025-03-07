import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DepartamentosService } from '../service/departamentos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-departamentos',
  templateUrl: './edit-departamentos.component.html',
  styleUrls: ['./edit-departamentos.component.scss']
})
export class EditDepartamentosComponent {
  @Output() DepartamentoE: EventEmitter<any> = new EventEmitter();
    //METODO PARA ENVIAR AL COMPONENTE padre al hijo  y la variable es la misma que va a recibir en el componente edit
    @Input() DEPARTAMENTO_SELECTED:any;

    descripcion: string = '';
    isLoading: any;
    estatus: boolean = false; // Nuevo estado del checkbox

    constructor(
      public modal: NgbActiveModal,
      public departamentosService: DepartamentosService,
      public toast: ToastrService
    ) {

    }

    ngOnInit(): void {
      this.descripcion = this.DEPARTAMENTO_SELECTED.descripcion;
      this.estatus = this.DEPARTAMENTO_SELECTED.estatus === 1;
    }

    //metodo para la agregar los permisos de la lista de checksbox o quitar, al


    store() {
      if (!this.descripcion) {
        this.toast.error("Error", "El nombre es requerido");
        return false;
      }
       let data = {
        descripcion: this.descripcion,
        estatus: this.estatus ? 1 : 0, // Convertir booleano a 1 o 0 antes de enviarlo
      }

      this.departamentosService.updateDepartamento(this.DEPARTAMENTO_SELECTED.id,data).subscribe((resp: any) => {
        console.log(resp);

        //como este es la vista hija se enviaran a la vista padre que es la
        if (resp.message == 403) {
          this.toast.error("Error", resp.message_text);
        } else {
          //este sirve para emitir los cambios al crear en este caso y pasamos la variable del rol creado

          this.toast.info("Departamento actualizado con exito", "Excelente", {
            //de esta forma podemos darle otra vista al toastr
            progressBar: true,
            timeOut: 1000,
            extendedTimeOut: 1000,
          });
          this.DepartamentoE.emit(resp.departamento);
          //cerramos el modal al guardar y crear el rol
          this.modal.close();
        }
      })
    }
}
