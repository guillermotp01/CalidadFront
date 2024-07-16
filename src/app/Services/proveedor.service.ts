import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../Settings/appSettings';
import { Proveedor } from '../Models/Proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  private http=inject(HttpClient);
  private apiUrl: string = appsettings.apiUrl + "/proveedor";

  constructor() { }

  listar() {
    return this.http.get<Proveedor[]>(`${this.apiUrl}/listar`);
  }
}
