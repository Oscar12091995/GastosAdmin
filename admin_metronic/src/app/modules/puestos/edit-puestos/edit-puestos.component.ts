import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PuestosService } from '../service/puestos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-puestos',
  templateUrl: './edit-puestos.component.html',
  styleUrls: ['./edit-puestos.component.scss']
})
export class EditPuestosComponent {
   @Output() PuestoE: EventEmitter<any> = new EventEmitter();
      //METODO PARA ENVIAR AL COMPONENTE padre al hijo  y la variable es la misma que va a recibir en el componente edit
      @Input() PUESTO_SELECTED:any;

      descripcion: string = '';
      isLoading: any;
      estatus: boolean = false;
      departamento:string = '';
      DEPARTAMENTOS:any[] = [];

          constructor(
            public modal: NgbActiveModal,
            public puestosService: PuestosService,
            public toast: ToastrService,
            private cdr: ChangeDetectorRef // Para forzar la actualización de la vista

          ) {

          }

          ngOnInit(): void{
            this.descripcion = this.PUESTO_SELECTED.descripcion;
            this.estatus = this.PUESTO_SELECTED.estatus === 1;
            this.departamento  = this.PUESTO_SELECTED.departamento_id;

            console.log(this.departamento);
             // Cargar departamentos desde el servicio
      this.puestosService.configAll().subscribe((resp: any) => {
        this.DEPARTAMENTOS = resp.departamentos;


            // Extraer solo el ID si `departamento` es un objeto

            });
          }

          store() {
            if (!this.descripcion) {
              this.toast.error("Error", "El nombre es requerido");
              return false;
            }
             let data = {
              descripcion: this.descripcion,
              estatus: this.estatus ? 1 : 0, // Convertir booleano a 1 o 0 antes de enviarlo
              departamento: this.departamento,
            }

            this.puestosService.updatePuesto(this.PUESTO_SELECTED.id,data).subscribe((resp: any) => {
              console.log(resp);

              //como este es la vista hija se enviaran a la vista padre que es la
              if (resp.message == 403) {
                this.toast.error("Error", resp.message_text);
              } else {
                //este sirve para emitir los cambios al crear en este caso y pasamos la variable del rol creado

                this.toast.info("El puesto se actualizo con exito", "Excelente", {
                  //de esta forma podemos darle otra vista al toastr
                  progressBar: true,
                  timeOut: 1000,
                  extendedTimeOut: 1000,
                });
                this.PuestoE.emit(resp.puesto);
                //cerramos el modal al guardar y crear el rol
                this.modal.close();
              }
            })
          }
}
