import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../../auth';

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
}
