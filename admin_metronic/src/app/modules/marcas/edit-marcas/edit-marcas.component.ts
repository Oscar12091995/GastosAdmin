import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MarcasService } from '../service/marcas.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-marcas',
  templateUrl: './edit-marcas.component.html',
  styleUrls: ['./edit-marcas.component.scss']
})
export class EditMarcasComponent {
  @Output() MarcaEdit: EventEmitter<any> = new EventEmitter();
  //METODO PARA ENVIAR AL COMPONENTE padre al hijo  y la variable es la misma que va a recibir en el componente edit
  @Input() MARCA_SELECTED: any;

  descripcion: string = '';
  isLoading: any;
  estatus: boolean = false; // Nuevo estado del checkbox

  constructor(
    public modal: NgbActiveModal,
    public marcasService: MarcasService,
    public toast: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.descripcion = this.MARCA_SELECTED.descripcion;
    this.estatus = this.MARCA_SELECTED.estatus === 1;
  }

  store() {
    if (!this.descripcion) {
      this.toast.error("Error", "El nombre de la marca es requerido");
      return false;
    }
    let data = {
      descripcion: this.descripcion,
      estatus: this.estatus ? 1 : 0, // Convertir booleano a 1 o 0 antes de enviarlo
    }

    console.log(this.descripcion, this.estatus);

    this.marcasService.updateMarca(this.MARCA_SELECTED.id, data).subscribe((resp: any) => {
      console.log(resp);

      //como este es la vista hija se enviaran a la vista padre que es la
      if (resp.message == 403) {
        this.toast.error("Error", resp.message_text);
      } else {
        //este sirve para emitir los cambios al crear en este caso y pasamos la variable del rol creado

        this.toast.info("Marca actualizada con exito", "Excelente", {
          //de esta forma podemos darle otra vista al toastr
          progressBar: true,
          timeOut: 1000,
          extendedTimeOut: 1000,
        });
        this.MarcaEdit.emit(resp.marca);
        //cerramos el modal al guardar y crear el rol
        this.modal.close();
      }
    })
  }

}
