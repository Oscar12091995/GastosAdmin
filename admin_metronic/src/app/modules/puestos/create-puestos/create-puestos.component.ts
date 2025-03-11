import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PuestosService } from '../service/puestos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-puestos',
  templateUrl: './create-puestos.component.html',
  styleUrls: ['./create-puestos.component.scss']
})
export class CreatePuestosComponent {
 @Output() PuestoC: EventEmitter<any> = new EventEmitter();
    descripcion: string = '';
    estatus: boolean = true; //
    isLoading: any;
    DEPARTAMENTOS:any = [];
    departamento:any = 0;

    constructor(
          public modal: NgbActiveModal,
          public puestosService: PuestosService,
          public toast: ToastrService
        ) {

        }

        ngOnInit(): void {

          this.puestosService.configAll().subscribe((resp:any) => {
            console.log(resp);
            this.DEPARTAMENTOS = resp.departamentos;
          })
        }

        store() {
          if (!this.descripcion) {
            this.toast.error("Error", "El nombre es requerido");
            return false;
          }

          if (this.departamento === 0) {
            this.toast.error("Error", "Debe seleccionar un departamento");
            return false;
          }

          let data = {
            descripcion: this.descripcion,
            departamento: this.departamento,
          }

          this.puestosService.registerPuesto(data).subscribe((resp: any) => {
            console.log(resp);

            //como este es la vista hija se enviaran a la vista padre que es la
            if (resp.message == 403) {
              this.toast.error("Error", resp.message_text);
            } else {
              //este sirve para emitir los cambios al crear en este caso y pasamos la variable del rol creado

              this.toast.success("Puesto creado con exito", "Excelente", {
                //de esta forma podemos darle otra vista al toastr
                progressBar: true,
                timeOut: 1000,
                extendedTimeOut: 1000,
              });
              this.PuestoC.emit(resp.puesto);
              //cerramos el modal al guardar y crear el rol
              this.modal.close();
            }
          })
        }

}
