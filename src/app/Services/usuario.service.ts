import { Injectable, inject } from '@angular/core';
import { Usuario } from '../Models/Usuario';
import { appsettings } from '../Settings/appSettings';
import { HttpClient } from '@angular/common/http';
import { ResponseAPI } from '../Models/ResponseAPI';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private http=inject(HttpClient);
  private apiUrl: string = appsettings.apiUrl + "/usuario";

  constructor() { }

  listar() {
    return this.http.get<Usuario[]>(`${this.apiUrl}/listar`);
  }
  
  obtener(codigo:number){
    return this.http.get<Usuario>(`${this.apiUrl}/obtener/${codigo}`);
  }

  crear(objeto:Usuario){
    return this.http.post<ResponseAPI>(`${this.apiUrl}/registrar`, objeto);
  }

  actualizar(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/actualizar/${id}`, usuario);
  }

  eliminar(codigo:number){
    return this.http.delete<ResponseAPI>(`${this.apiUrl}/eliminar/${codigo}`);
  }

  existeNombreUsuario(username: string){
    return this.http.get<boolean>(`${this.apiUrl}/existeUsuario/${username}`);
  }

  existeNombre(nombre: string){
    return this.http.get<boolean>(`${this.apiUrl}/existe/${nombre}`);
  }

}
