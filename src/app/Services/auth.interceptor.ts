import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
constructor(private loginService: LoginService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    
     // Verifica que estamos en el entorno del navegador
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token'); // Aquí estás llamando a getToken()

      // Verifica que el token no sea null
      console.log('Token recuperado en el interceptor:', token); // Verifica que este no sea null   
      if (token) {
        authReq = authReq.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });
      }
    }

    return next.handle(authReq);
  }
  

}
  export const authInterceptorProviders = [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ];