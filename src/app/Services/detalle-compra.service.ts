import { Injectable, inject } from '@angular/core';
import { Compra } from '../Models/Compra';
import { Producto } from '../Models/Productos';
import { appsettings } from '../Settings/appSettings';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetalleCompraService {
  private http=inject(HttpClient);
  private apiUrl: string = appsettings.apiUrl + "/carrito";

  constructor() { }

obtenerMisCompras(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/misCompras`);
}

  obtenerCompraPorId(id: number){
    return this.http.get<Compra>(`${this.apiUrl}/obtener/${id}`);
  }

  listarTodasCompras() {
    return this.http.get<Compra[]>(`${this.apiUrl}/listarTodo`);
  }
}
