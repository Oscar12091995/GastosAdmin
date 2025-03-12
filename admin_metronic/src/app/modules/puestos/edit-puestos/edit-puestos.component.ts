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
      departamento:any = 0;
      DEPARTAMENTOS:any[] = [];

          constructor(
            public modal: NgbActiveModal,
            public puestosService: PuestosService,
            public toast: ToastrService,
            private cdr: ChangeDetectorRef // Para forzar la actualización de la vista

          ) {

          }

          ngOnInit(): void{
            if (this.PUESTO_SELECTED) {
              this.descripcion = this.PUESTO_SELECTED.descripcion;
              this.estatus = this.PUESTO_SELECTED.estatus === 1;

              // Cargar departamentos desde el servicio
              this.puestosService.configAll().subscribe((resp: any) => {
                  this.DEPARTAMENTOS = resp.departamentos;

                  // Verifica si PUESTO_SELECTED.departamento es un objeto, un ID o una descripción
                  if (this.PUESTO_SELECTED.departamento) {
                      // if (typeof this.PUESTO_SELECTED.departamento === 'object' && this.PUESTO_SELECTED.departamento.id)
                      // {
                      //     // Caso 1: es un objeto { id: 2, descripcion: 'Limpieza' }
                      //     this.departamento = this.PUESTO_SELECTED.departamento.id;
                      // } else if (typeof this.PUESTO_SELECTED.departamento === 'number') {
                      //     // Caso 2: ya es un ID numérico
                      //     this.departamento = this.PUESTO_SELECTED.departamento;
                      // } else
                       if (typeof this.PUESTO_SELECTED.departamento === 'string') {
                          // Caso 3: es una descripción, buscar el ID correspondiente
                          const departamentoEncontrado = this.DEPARTAMENTOS.find(dep => dep.descripcion === this.PUESTO_SELECTED.departamento);
                          this.departamento = departamentoEncontrado ? departamentoEncontrado.id : 0;
                      }
                  } else {
                      this.departamento = 0; // Si no hay departamento asignado
                  }

                  console.log('Departamentos cargados:', this.DEPARTAMENTOS);
                  console.log('Departamento seleccionado (ID):', this.departamento);

                  // Forzar la detección de cambios en la vista
                  this.cdr.detectChanges();
              });
          }
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

            console.log(this.departamento);

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
