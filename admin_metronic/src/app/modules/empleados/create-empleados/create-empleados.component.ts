import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { EmpleadosService } from '../service/empleados.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-empleados',
  templateUrl: './create-empleados.component.html',
  styleUrls: ['./create-empleados.component.scss']
})
export class CreateEmpleadosComponent {
is_genero:any = 'masculino';
tab_selected:number = 1;
nombre:string = '';
empleado_imagen:any;
avatar_previsualiza:any = 'assets/media/svg/files/blank-image.svg';
appaterno:string = '';
apmaterno:string = '';
curp:string = '';
telefono:string = '';
genero:string = '';
rfc:string = '';
seguro_social:string = '';
departamento_id:number = 0;
puesto_id:number = 0;
fecha_ingreso:Date;
domicilio:string = '';
colonia:string = '';
municipio:string = '';
isLoading:any;
 form!: FormGroup;
 DEPARTAMENTOS:any[] = [];
PUESTOS:any[] = [];
isLoadingPuestos = false; // Variable de control

constructor(
  private fb: FormBuilder,
  public toast: ToastrService,
  public empleadoService: EmpleadosService
){
   this.form = this.fb.group({
        nombre: ['', Validators.required],
        appaterno: ['', Validators.required],
        apmaterno: ['', Validators.required],
        telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
        curp: ['', Validators.required],
        rfc: ['', Validators.required, ],
        //rfc: ['', [Validators.required, rfcValidator()]],
        seguro_social: ['', Validators.required],
        domicilio: ['', Validators.required],
        colonia: ['', Validators.required],
        municipio: ['', Validators.required],
        empleado_imagen:[''],
        genero: ['', Validators.required],
        fecha_ingreso: ['', Validators.required],
        departamento_id: [''],
        puesto_id: [{ value: '', disabled: true }],
      });
}

ngOnInit(): void{
  this.isLoading = this.empleadoService.isLoading$;
  this.empleadoService.departamentos().subscribe((resp:any) => {
    console.log(resp);
    this.DEPARTAMENTOS = resp.departamentos;

  })
}

onDepartamentoChange(departamento_id: number) {
  this.form.patchValue({ puesto_id: '' });
  this.form.get('puesto_id')?.disable(); // Desactiva el select de puestos
  this.PUESTOS = []; // Limpia puestos anteriores

  if (departamento_id && departamento_id != 0) {
    this.isLoadingPuestos = true; // Activa el indicador

    this.empleadoService.puestos(departamento_id).subscribe((response) => {
      this.PUESTOS = response.puestos;
      this.isLoadingPuestos = false; // Oculta el indicador cuando termina

      if (this.PUESTOS.length > 0) {
        this.form.get('puesto_id')?.enable(); // Activa si hay puestos
      }
    }, error => {
      this.isLoadingPuestos = false; // Oculta en caso de error
      console.error("Error al cargar los puestos", error);
    });
  }
}

isloadingProccess(){
  this.empleadoService.isLoadingSubject.next(true);
  setTimeout(() => {
    this.empleadoService.isLoadingSubject.next(false);
  }, 50);
}

processFile($event:any){
  if ($event.target.files[0].type.indexOf("image") < 0) {
    this.toast.warning("WARN", "El archivo no es una imagen");
    return false;
  }
  this.empleado_imagen = $event.target.files[0];
  let reader = new FileReader();
  reader.readAsDataURL(this.empleado_imagen);
  reader.onloadend = () => this.avatar_previsualiza = reader.result;
  //this.isloadingProccess();
}

selectedGenero(val:any){
  this.is_genero = val;
}

selectedTab(val:number){
this.tab_selected = val;
}

store(){
  this.form.markAllAsTouched();

    if (this.form.invalid) {
      console.log(this.form.value);
      this.toast.error("Error", "Por favor completa los campos correctamente.");
      return;
    }

    if (this.DEPARTAMENTOS.length == 0) {
      this.toast.error("Error", "Por favor selecciona un departamento");
      return;
    }

    if (this.PUESTOS.length == 0) {
      this.toast.error("Error", "Por favor selecciona un departamento");
      return;
    }

    let formData = new FormData();
  // Agregar los campos del formulario al FormData
  Object.keys(this.form.value).forEach(key => {
    const value = this.form.get(key)?.value;
    formData.append(key, value);

  });
  formData.append('empleado_imagen', this.empleado_imagen);
  // Si hay un avatar (imagen), agregarla al FormData
    // Agregar la imagen con el nombre que Laravel espera
    // if (this.empleado_imagen) {

    // }

  console.log(this.empleado_imagen);
  console.log(formData);
   // const data = this.form.value;

    this.empleadoService.registerEmpleado(formData).subscribe((resp: any) => {
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
        //this.ProveedorCreate.emit(resp.proveedor);
        //cerramos el modal al guardar y crear el rol
        //this.modal.close();
      }
    })

}

}
