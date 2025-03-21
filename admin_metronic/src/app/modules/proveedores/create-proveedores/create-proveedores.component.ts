import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { ProveedoresService } from '../service/proveedores.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { rfcValidator } from './rfc-validator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-proveedores',
  templateUrl: './create-proveedores.component.html',
  styleUrls: ['./create-proveedores.component.scss']
})
export class CreateProveedoresComponent {
  @Output() ProveedorCreate: EventEmitter<any> = new EventEmitter();
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
    estatus: boolean = true; //
    isLoading: any;
    form!: FormGroup;

    constructor(
      private fb: FormBuilder,
          public modal: NgbActiveModal,
          public proveedoresService: ProveedoresService,
          public toast: ToastrService
        ) {
          this.form = this.fb.group({
            nombre: ['', Validators.required],
            direccion: ['', Validators.required],
            telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
            correo: ['', [Validators.required, Validators.email]],
            rfc: ['', [Validators.required, rfcValidator()]],
            estatus: [true],
          });
        }

        store() {
          if (this.form.invalid) {
            this.toast.error("Error", "Por favor completa los campos correctamente.");
            return;
          }
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
            estatus: this.estatus,
            direccion: this.direccion,
            telefono: this.telefono,
            correo: this.correo,
            rfc: this.rfc,
          }

          this.proveedoresService.registerProveedor(data).subscribe((resp: any) => {
            console.log(resp);

            //como este es la vista hija se enviaran a la vista padre que es la
            if (resp.message == 403) {
              this.toast.error("Error", resp.message_text);
            } else {
              //este sirve para emitir los cambios al crear en este caso y pasamos la variable del rol creado

              this.toast.success("Proveedor anadido con exito", "Excelente", {
                //de esta forma podemos darle otra vista al toastr
                progressBar: true,
                timeOut: 1000,
                extendedTimeOut: 1000,
              });
              this.ProveedorCreate.emit(resp.proveedor);
              //cerramos el modal al guardar y crear el rol
              this.modal.close();
            }
          })
        }
}
