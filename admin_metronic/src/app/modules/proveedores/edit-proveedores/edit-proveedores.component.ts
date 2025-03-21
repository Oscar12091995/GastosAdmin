import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProveedoresService } from '../service/proveedores.service';

@Component({
  selector: 'app-edit-proveedores',
  templateUrl: './edit-proveedores.component.html',
  styleUrls: ['./edit-proveedores.component.scss']
})
export class EditProveedoresComponent {
  @Output() ProveedorEdit: EventEmitter<any> = new EventEmitter();
  @Input() PROVEEDOR_SELECTED:any;

    @ViewChild('nombreInput') nombreInput!: ElementRef;
    @ViewChild('direccionInput') direccionInput!: ElementRef;
    @ViewChild('telefonoInput') telefonoInput!: ElementRef;
    @ViewChild('correoInput') correoInput!: ElementRef;
    @ViewChild('rfcInput') rfcInput!: ElementRef;
    nombre: string = '';
    direccion: string = '';
    telefono: string = '';
    correo: string = '';
    rfc: string = '';
      estatus: boolean = false; //
      isLoading: any;

      constructor(
                  public modal: NgbActiveModal,
                  public proveedoresService: ProveedoresService,
                  public toast: ToastrService
      ){

      }

      ngOnInit(): void {
        this.nombre = this.PROVEEDOR_SELECTED.nombre;
        this.direccion = this.PROVEEDOR_SELECTED.direccion;
        this.telefono = this.PROVEEDOR_SELECTED.telefono;
        this.correo = this.PROVEEDOR_SELECTED.correo;
        this.rfc = this.PROVEEDOR_SELECTED.rfc;
        this.estatus = this.PROVEEDOR_SELECTED.estatus === 1;
      }


      store() {
        if (!this.nombre) {
          this.toast.error("Error", "El nombre del proveedor es requerido");
          this.nombreInput.nativeElement.focus();
          return false;
        }

        if (!this.direccion) {
          this.toast.error("Error", "La dirección del proveedor es requerida");
          this.direccionInput.nativeElement.focus();
          return false;
        }

        if (!this.telefono) {
          this.toast.error("Error", "La dirección del proveedor es requerida");
          this.telefonoInput.nativeElement.focus();
          return false;
        }
        if (!this.correo) {
          this.toast.error("Error", "La dirección del proveedor es requerida");
          this.correoInput.nativeElement.focus();
          return false;
        }
        if (!this.rfc) {
          this.toast.error("Error", "el RFC del proveedor es requerida");
          this.rfcInput.nativeElement.focus();
          return false;
        }


        let data = {
          nombre: this.nombre,
          direccion: this.direccion,
          telefono: this.telefono,
          correo: this.correo,
          rfc: this.rfc,
          estatus: this.estatus ? 1 : 0,
        }

        this.proveedoresService.updateProveedor(this.PROVEEDOR_SELECTED.id,data).subscribe((resp: any) => {
          console.log(resp);

          //como este es la vista hija se enviaran a la vista padre que es la
          if (resp.message == 403) {
            this.toast.error("Error", resp.message_text);
          } else {
            //este sirve para emitir los cambios al crear en este caso y pasamos la variable del rol creado

            this.toast.success("Proveedor actualizado con exito", "Excelente", {
              //de esta forma podemos darle otra vista al toastr
              progressBar: true,
              timeOut: 1000,
              extendedTimeOut: 1000,
            });
            this.ProveedorEdit.emit(resp.proveedor);
            //cerramos el modal al guardar y crear el rol
            this.modal.close();
          }
        })
      }

}
