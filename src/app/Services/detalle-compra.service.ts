import { Injectable, inject } from '@angular/core';
import { Compra } from '../Models/Compra';
import { Producto } from '../Models/Productos';
import { appsettings } from '../Settings/appSettings';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DetalleCompraService {
  private http=inject(HttpClient);
  private apiUrl: string = appsettings.apiUrl + "/carrito";

  constructor() { }

  obtenerMisCompras(){
    return this.http.get<Compra[]>(`${this.apiUrl}/misCompras`);
  }

  obtenerCompraPorId(id: number){
    return this.http.get<Compra>(`${this.apiUrl}/obtener/${id}`);
  }

  listarTodasCompras() {
    return this.http.get<Compra[]>(`${this.apiUrl}/listarTodo`);
  }
}
