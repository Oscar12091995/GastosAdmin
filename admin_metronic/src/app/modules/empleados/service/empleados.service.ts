import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { AuthService } from '../../auth';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

   isLoading$: Observable<boolean>;
      isLoadingSubject: BehaviorSubject<boolean>;

    constructor(
      //petciones http al backend
          private http: HttpClient,
          //servicio de logeo para el prefijo del api auth
          public authservice: AuthService,
    ) {
      this.isLoadingSubject = new BehaviorSubject<boolean>(false);
      this.isLoading$ = this.isLoadingSubject.asObservable();
    }

     departamentos(){
            this.isLoadingSubject.next(true);
            //para acceder al token y enviarlo en la apeticion http
            let headers = new HttpHeaders({'Authorization': 'Bearer ' + this.authservice.token});
            //para accerder la url la variable es de la variable global del archivo config y paso en la URL ek ID_ROL
            let URL = URL_SERVICIOS + "/empleados/departaments";
            //se retorna el metodo http -> put -> que es para actualizar, pasamos el URL, el arreglo de la data con los datos necesarios
            return this.http.get(URL,{headers: headers}).pipe(
              //con esto damos por finalizado la solicitud http
              finalize(() => this.isLoadingSubject.next(false))
            );
          }

          puestos(departamento_id: number) {
            this.isLoadingSubject.next(true);
            const headers = new HttpHeaders({
              'Authorization': 'Bearer ' + this.authservice.token
            });

            const URL = `${URL_SERVICIOS}/empleados/puests?departamento_id=${departamento_id}`;

            return this.http.get<any>(URL, { headers }).pipe(
              finalize(() => this.isLoadingSubject.next(false))
            );
          }

          registerEmpleado(formData: FormData) {
            //apartado necesario de metronic
            //inicio de solicitud http
            this.isLoadingSubject.next(true);
            //para acceder al token y enviarlo en la apeticion http
            let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
            //para accerder la url la variable es de la variable global del archivo config
            let URL = URL_SERVICIOS + "/empleados";
            //se retorna el metodo http -> post, pasamos el URL, el arreglo de la data con los datos necesarios
            return this.http.post(URL, formData, { headers: headers }).pipe(
              //con esto damos por finalizado la solicitud http
              finalize(() => this.isLoadingSubject.next(false))
            );
          }

}
