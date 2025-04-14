import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuariosService } from '../service/usuarios.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.scss']
})
export class EditUsuarioComponent {
@Output() UsuarioE: EventEmitter<any> = new EventEmitter();
@Input() ROLES:any = [];
@Input() USUARIO_SELECTED:any = [];
    name: string = '';
    apellido: string = '';
    email:string = '';
    role_id:number;
    password:string = '';
    password_repeat:string = '';

      estatus: boolean = true; //
      isLoading: any;
       form!: FormGroup;
       usuario_imagen:any = [];
       avatar_previsualiza:any = [];


  constructor(
        private fb: FormBuilder,
        public modal: NgbActiveModal,
        public usuariosService: UsuariosService,
        public toast: ToastrService
      ) {
         this.form = this.fb.group({
              name: ['', Validators.required],
              apellido: ['', Validators.required],
              email: ['', [Validators.required, Validators.email]],
              role_id: [Validators.required],
              usuario_imagen: [''],
              password:[''],
              password_repeat:['']
            });
      }

      processFile($event:any){
        if ($event.target.files[0].type.indexOf("image") < 0) {
          this.toast.warning("WARN", "El archivo no es una imagen");
          return false;
        }
        this.usuario_imagen = $event.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(this.usuario_imagen);
        reader.onloadend = () => this.avatar_previsualiza = reader.result;
        //this.isloadingProccess();
      }

      ngOnInit(): void {
        //para cargar los formularios reactivos
        if (this.USUARIO_SELECTED) {
          this.form.patchValue({
            name: this.USUARIO_SELECTED.nombre,
            apellido: this.USUARIO_SELECTED.apellido,
            email: this.USUARIO_SELECTED.email,
            role_id: this.USUARIO_SELECTED.role_id,
            password: this.USUARIO_SELECTED.password,
            usuario_imagen: '', // si no quieres mostrar imagen en input
          });

          this.avatar_previsualiza = this.USUARIO_SELECTED.avatar;
        }
      }

      store() {
        this.form.markAllAsTouched();

        if (this.form.invalid) {
          this.toast.error("Error", "Por favor completa los campos correctamente.");
          return;
        }

        if (this.ROLES.length == 0) {
          this.toast.error("Error", "Por favor selecciona un rol");
          return;
        }

        if (this.password && this.password != this.password_repeat) {
          this.toast.error("Error", "Las contraseñas no coinciden");
          return;
        }

        let formData = new FormData();
  // Agregar los campos del formulario al FormData
  Object.keys(this.form.value).forEach(key => {
    const value = this.form.get(key)?.value;
    formData.append(key, value);

  });

  if (this.password) {
    formData.append('password', this.password);

  }

  if (this.usuario_imagen) {
    formData.append('usuario_imagen', this.usuario_imagen);

  }

  console.log(this.usuario_imagen);
  console.log(formData);

        this.usuariosService.updateUsuario(this.USUARIO_SELECTED.id,formData).subscribe((resp: any) => {
          console.log(resp);

          //como este es la vista hija se enviaran a la vista padre que es la
          if (resp.message == 403) {
            this.toast.error("Error", resp.message_text);
          } else {
            //este sirve para emitir los cambios al crear en este caso y pasamos la variable del rol creado

            this.toast.success("Usuario editado con exito", "Excelente", {
              //de esta forma podemos darle otra vista al toastr
              progressBar: true,
              timeOut: 1000,
              extendedTimeOut: 1000,
            });
            this.UsuarioE.emit(resp.usuario);
            //cerramos el modal al guardar y crear el rol
            this.modal.close();
          }
        })
      }
}
