import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appsettings } from '../Settings/appSettings';
import { Subject} from 'rxjs';
import { ResponseAPI } from '../Models/ResponseAPI';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl: string = appsettings.apiUrl + "/validar";
  public loginStatusSubject = new Subject<boolean>();

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

  public generarToken(loginData: any) {
    return this.http.post<ResponseAPI>(`${this.apiUrl}/ingresar`, loginData);
  }

  public getCurrentUser() {
    return this.http.get(`${this.apiUrl}/actual-usuario`);
  }

  public loginUser(token: any) {
    localStorage.setItem('token', token);
    return true;
  }

  public isLoggedIn(): boolean {
    let tokenStr = localStorage.getItem('token');
    return !!tokenStr;
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role'); 
    this.loginStatusSubject.next(false);
    return true;
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    this.setUserRole(user.authorities[0].authority); // Almacenar el rol del usuario
  }

  getUser() {
    if (isPlatformBrowser(this.platformId)) {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  }

  public setUserRole(role: string) {
    localStorage.setItem('role', role);
  }

  public getUserRole() {
    return localStorage.getItem('role');
  }
}
