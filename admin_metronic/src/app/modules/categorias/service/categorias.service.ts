import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { AuthService } from '../../auth';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

    //este fragmento es obligatorio en los servicios al trabajar con metronic
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

    listCategorias(page = 1, search:string = ''){
          //apartado necesario de metronic
        //inicio de solicitud http
        this.isLoadingSubject.next(true);
        //para acceder al token y enviarlo en la apeticion http
        let headers = new HttpHeaders({'Authorization': 'Bearer ' + this.authservice.token});
        //para accerder la url la variable es de la variable global del archivo config, aqui pasamos la variables por url
        //page que se definio la #1 como default para decir a laravel que va a retornar la paginacion 1
        //y para la variable search segun el input indicado nos envie lso datos ingresados
        let URL = URL_SERVICIOS + "/categorias?page="+page+"&search="+search;
        //se retorna el metodo http -> get para listar los datos, pasamos el URL, el arreglo de la data con los datos necesarios
        return this.http.get(URL,{headers: headers}).pipe(
          //con esto damos por finalizado la solicitud http
          finalize(() => this.isLoadingSubject.next(false))
        );
      }

      registerCategoria(data:any){
        //apartado necesario de metronic
        //inicio de solicitud http
        this.isLoadingSubject.next(true);
        //para acceder al token y enviarlo en la apeticion http
        let headers = new HttpHeaders({'Authorization': 'Bearer ' + this.authservice.token});
        //para accerder la url la variable es de la variable global del archivo config
        let URL = URL_SERVICIOS + "/categorias";
        //se retorna el metodo http -> post, pasamos el URL, el arreglo de la data con los datos necesarios
        return this.http.post(URL,data,{headers: headers}).pipe(
          //con esto damos por finalizado la solicitud http
          finalize(() => this.isLoadingSubject.next(false))
        );
      }

       //este metodo actualiza es igual al de rol, solo que paso el ID_ROL en la funcion
    //para editar ese respectivamente
    updateCategoria(ID_CATEGORIA:string,data:any){
      //apartado necesario de metronic
      //inicio de solicitud http
      this.isLoadingSubject.next(true);
      //para acceder al token y enviarlo en la apeticion http
      let headers = new HttpHeaders({'Authorization': 'Bearer ' + this.authservice.token});
      //para accerder la url la variable es de la variable global del archivo config y paso en la URL ek ID_ROL
      let URL = URL_SERVICIOS + "/categorias/" + ID_CATEGORIA;
      //se retorna el metodo http -> put -> que es para actualizar, pasamos el URL, el arreglo de la data con los datos necesarios
      return this.http.put(URL,data,{headers: headers}).pipe(
        //con esto damos por finalizado la solicitud http
        finalize(() => this.isLoadingSubject.next(false))
      );
    }

    deleteCategoria(ID_CATEGORIA:string){
      //apartado necesario de metronic
      //inicio de solicitud http
      this.isLoadingSubject.next(true);
      //para acceder al token y enviarlo en la apeticion http
      let headers = new HttpHeaders({'Authorization': 'Bearer ' + this.authservice.token});
      //para accerder la url la variable es de la variable global del archivo config y paso en la URL ek ID_ROL
      let URL = URL_SERVICIOS + "/categorias/" + ID_CATEGORIA;
      //se retorna el metodo http -> put -> que es para actualizar, pasamos el URL, el arreglo de la data con los datos necesarios
      return this.http.delete(URL,{headers: headers}).pipe(
        //con esto damos por finalizado la solicitud http
        finalize(() => this.isLoadingSubject.next(false))
      );
    }
}
