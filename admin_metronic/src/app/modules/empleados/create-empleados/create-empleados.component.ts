import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { EmpleadosService } from '../service/empleados.service';

@Component({
  selector: 'app-create-empleados',
  templateUrl: './create-empleados.component.html',
  styleUrls: ['./create-empleados.component.scss']
})
export class CreateEmpleadosComponent {
is_genero:any = 'masculino';
tab_selected:number = 1;
nombre:string = '';
avatar:any;
avatar_previsualiza:any = 'assets/media/svg/files/blank-image.svg';
appaterno:string = '';
apmaterno:string = '';
curp:string = '';
telefono:string = '';
genero:string = '';
rfc:string = '';
seguro_social:string = '';
departamento_id:number = 1;
puesto_id:number = 1;
fecha_ingreso:Date;
domicilio:string = '';
colonia:string = '';
municipio:string = '';
isLoading:any;

constructor(
  public toast: ToastrService,
  public empleadoService: EmpleadosService
){

}

ngOnInit(): void{
  this.isLoading = this.empleadoService.isLoading$;
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
  this.avatar = $event.target.files[0];
  let reader = new FileReader();
  reader.readAsDataURL(this.avatar);
  reader.onloadend = () => this.avatar_previsualiza = reader.result;
  this.isloadingProccess();
}

selectedGenero(val:any){
  this.is_genero = val;
}

selectedTab(val:number){
this.tab_selected = val;
}

}
