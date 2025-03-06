import { Component, EventEmitter, Output } from '@angular/core';
import { DepartamentosService } from '../service/departamentos.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SIDEBAR } from 'src/app/config/config';

@Component({
  selector: 'app-create-departamentos',
  templateUrl: './create-departamentos.component.html',
  styleUrls: ['./create-departamentos.component.scss']
})
export class CreateDepartamentosComponent {
  @Output() DepartamentoC: EventEmitter<any> = new EventEmitter();
    descripcion: string = '';
    isLoading: any;
    SIDEBAR: any = SIDEBAR;

    constructor(
      public modal: NgbActiveModal,
      public departamentosService: DepartamentosService,
      public toast: ToastrService
    ) {

    }

    ngOnInit(): void {

    }

    store() {
      if (!this.descripcion) {
        this.toast.error("Error", "El nombre es requerido");
        return false;
      }

      let data = {
        descripcion: this.descripcion,
      }

      this.departamentosService.registerDepartamento(data).subscribe((resp: any) => {
        console.log(resp);

        //como este es la vista hija se enviaran a la vista padre que es la
        if (resp.message == 403) {
          this.toast.error("Error", resp.message_text);
        } else {
          //este sirve para emitir los cambios al crear en este caso y pasamos la variable del rol creado

          this.toast.success("Departamento creado con exito", "Excelente", {
            //de esta forma podemos darle otra vista al toastr
            progressBar: true,
            timeOut: 1000,
            extendedTimeOut: 1000,
          });
          this.DepartamentoC.emit(resp.departamento);
          //cerramos el modal al guardar y crear el rol
          this.modal.close();
        }
      })
    }

}
