import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MarcasService } from '../service/marcas.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-marcas',
  templateUrl: './create-marcas.component.html',
  styleUrls: ['./create-marcas.component.scss']
})
export class CreateMarcasComponent {
@Output() MarcaCreate: EventEmitter<any> = new EventEmitter();

descripcion: string = '';
estatus: boolean = true; //
isLoading: any;

 constructor(
          public modal: NgbActiveModal,
          public marcasService: MarcasService,
          public toast: ToastrService
        ) {

        }

        ngOnInit(): void {

        }

        store() {
          if (!this.descripcion) {
            this.toast.error("Error", "El nombre de la marca es requerido");
            return false;
          }

          let data = {
            descripcion: this.descripcion,
            estatus: this.estatus,
          }

          this.marcasService.registerMarca(data).subscribe((resp: any) => {
            console.log(resp);

            //como este es la vista hija se enviaran a la vista padre que es la
            if (resp.message == 403) {
              this.toast.error("Error", resp.message_text);
            } else {
              //este sirve para emitir los cambios al crear en este caso y pasamos la variable del rol creado

              this.toast.success("Marca creada con exito", "Excelente", {
                //de esta forma podemos darle otra vista al toastr
                progressBar: true,
                timeOut: 1000,
                extendedTimeOut: 1000,
              });
              this.MarcaCreate.emit(resp.marca);
              //cerramos el modal al guardar y crear el rol
              this.modal.close();
            }
          })
        }

}
