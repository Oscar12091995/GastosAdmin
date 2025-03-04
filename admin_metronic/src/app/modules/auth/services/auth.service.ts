import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import { AuthModel } from '../models/auth.model';
import { AuthHTTPService } from './auth-http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';

export type UserType = UserModel | undefined;

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  // public fields
  currentUser$: Observable<UserType>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<UserType>;
  isLoadingSubject: BehaviorSubject<boolean>;

  get currentUserValue(): UserType {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: UserType) {
    this.currentUserSubject.next(user);
  }

  token:any;
  user:any;

  constructor(
    private authHttpService: AuthHTTPService,
    private router: Router,
    //servicio http client para el envio de datos
    private http: HttpClient,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<UserType>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
    const subscr = this.getUserByToken().subscribe();
    this.unsubscribe.push(subscr);
  }

  // public methods, login con datos fake para metronic
  // login(email: string, password: string): Observable<UserType> {
  //   this.isLoadingSubject.next(true);
  //   return this.authHttpService.login(email, password).pipe(
  //     map((auth: AuthModel) => {
  //       const result = this.setAuthFromLocalStorage(auth);
  //       return result;
  //     }),
  //     switchMap(() => this.getUserByToken()),
  //     catchError((err) => {
  //       console.error('err', err);
  //       return of(undefined);
  //     }),
  //     finalize(() => this.isLoadingSubject.next(false))
  //   );
  // }

  login(email: string, password: string): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.http.post(URL_SERVICIOS + "/auth/login",{email,password}).pipe(
      map((auth: any) => {
        const result = this.setAuthFromLocalStorage(auth);
        return result;
      }),
      //switchMap(() => this.getUserByToken()),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  //logout de datos fake de metronic
  // logout() {
  //   localStorage.removeItem(this.authLocalStorageToken);
  //   this.router.navigate(['/auth/login'], {
  //     queryParams: {},
  //   });
  // }

  //logout de datos de api
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }

  //metodo para inicio de token fake de metronic
  // getUserByToken(): Observable<UserType> {
  //   const auth = this.getAuthFromLocalStorage();
  //   if (!auth || !auth.authToken) {
  //     return of(undefined);
  //   }

  //   this.isLoadingSubject.next(true);
  //   return this.authHttpService.getUserByToken(auth.authToken).pipe(
  //     map((user: UserType) => {
  //       if (user) {
  //         this.currentUserSubject.next(user);
  //       } else {
  //         this.logout();
  //       }
  //       return user;
  //     }),
  //     finalize(() => this.isLoadingSubject.next(false))
  //   );
  // }

//metodo de usuario por token con datos de la api
  getUserByToken(): Observable<any> {
    const auth = this.getAuthFromLocalStorage();
    if (!auth) {
      return of(undefined);
    }

    this.isLoadingSubject.next(true);
    return of(auth).pipe(
      map((user: any) => {
        if (user) {
          this.currentUserSubject.next(user);
        } else {
          this.logout();
        }
        return user;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  // need create new user then login
  registration(user: UserModel): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.createUser(user).pipe(
      map(() => {
        this.isLoadingSubject.next(false);
      }),
      switchMap(() => this.login(user.email, user.password)),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  forgotPassword(email: string): Observable<boolean> {
    this.isLoadingSubject.next(true);
    return this.authHttpService
      .forgotPassword(email)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  // private methods y verificacion para datos fake
  // private setAuthFromLocalStorage(auth: AuthModel): boolean {
  //   // store auth authToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
  //   if (auth && auth.authToken) {
  //     localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
  //     return true;
  //   }
  //   return false;
  // }


  //inicio de sesion con los datos de la api
  private setAuthFromLocalStorage(auth: any): boolean {
    // store auth authToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    if (auth && auth.access_token) {
      localStorage.setItem('token', auth.access_token);
      localStorage.setItem('user',JSON.stringify(auth.user))
      return true;
    }
    return false;
  }

  //storage para datos fake de metronic
  // private getAuthFromLocalStorage(): AuthModel | undefined {
  //   try {
  //     const lsValue = localStorage.getItem(this.authLocalStorageToken);
  //     if (!lsValue) {
  //       return undefined;
  //     }

  //     const authData = JSON.parse(lsValue);
  //     return authData;
  //   } catch (error) {
  //     console.error(error);
  //     return undefined;
  //   }
  // }

  //storage para datos del api
  private getAuthFromLocalStorage(): AuthModel | undefined {
    try {
      const lsValue = localStorage.getItem('user');
      if (!lsValue) {
        return undefined;
      }
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(lsValue);
      const authData = this.user;
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
