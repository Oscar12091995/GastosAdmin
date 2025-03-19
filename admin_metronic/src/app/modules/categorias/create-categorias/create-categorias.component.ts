import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategoriasService } from '../service/categorias.service';

@Component({
  selector: 'app-create-categorias',
  templateUrl: './create-categorias.component.html',
  styleUrls: ['./create-categorias.component.scss']
})
export class CreateCategoriasComponent {
 @Output() CategoriaCreate: EventEmitter<any> = new EventEmitter();

    descripcion: string = '';
    estatus: boolean = true; //
    isLoading: any;

     constructor(
          public modal: NgbActiveModal,
          public categoriasService: CategoriasService,
          public toast: ToastrService
        ) {

        }

        ngOnInit(): void {

        }

        store() {
          if (!this.descripcion) {
            this.toast.error("Error", "El nombre de la categoría es requerido");
            return false;
          }

          let data = {
            descripcion: this.descripcion,
            estatus: this.estatus,
          }

          this.categoriasService.registerCategoria(data).subscribe((resp: any) => {
            console.log(resp);

            //como este es la vista hija se enviaran a la vista padre que es la
            if (resp.message == 403) {
              this.toast.error("Error", resp.message_text);
            } else {
              //este sirve para emitir los cambios al crear en este caso y pasamos la variable del rol creado

              this.toast.success("Categoría creada con exito", "Excelente", {
                //de esta forma podemos darle otra vista al toastr
                progressBar: true,
                timeOut: 1000,
                extendedTimeOut: 1000,
              });
              this.CategoriaCreate.emit(resp.categoria);
              //cerramos el modal al guardar y crear el rol
              this.modal.close();
            }
          })
        }
}
