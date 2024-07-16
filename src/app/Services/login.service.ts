import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appsettings } from '../Settings/appSettings';
import { Subject} from 'rxjs';
import { ResponseAPI } from '../Models/ResponseAPI';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl: string = appsettings.apiUrl + "/validar";
  public loginStatusSubject = new Subject<boolean>();

  constructor(private http: HttpClient) { }

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

  public getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  public setUserRole(role: string) {
    localStorage.setItem('role', role);
  }

  public getUserRole() {
    return localStorage.getItem('role');
  }
}
