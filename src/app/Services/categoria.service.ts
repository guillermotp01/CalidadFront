import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../Settings/appSettings';
import { Categoria } from '../Models/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private http=inject(HttpClient);
  private apiUrl: string = appsettings.apiUrl + "/categoria";

  constructor() { }

  listar() {
    return this.http.get<Categoria[]>(`${this.apiUrl}/listar`);
  }
}
