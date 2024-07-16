import { Injectable, inject } from '@angular/core';
import { ResponseAPI } from '../Models/ResponseAPI';
import { Producto } from '../Models/Productos';
import { HttpClient, HttpParams } from '@angular/common/http';
import { appsettings } from '../Settings/appSettings';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private http=inject(HttpClient);
  private apiUrl: string = appsettings.apiUrl + "/producto";

  constructor() { }

  listar() {
    return this.http.get<Producto[]>(`${this.apiUrl}/listar`);
  }

  obtener(codigo:number){
    return this.http.get<Producto>(`${this.apiUrl}/obtener/${codigo}`);
  }

  crear(objeto:Producto){
    return this.http.post<ResponseAPI>(`${this.apiUrl}/registrar`, objeto);
  }

  eliminar(codigo:number){
    return this.http.delete<ResponseAPI>(`${this.apiUrl}/eliminar/${codigo}`);
  }

  existeNombreProducto(nombre: string){
    return this.http.get<boolean>(`${this.apiUrl}/existeProducto/${nombre}`);
  }

  actualizar(id: number, request: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/actualizar/${id}`, request);
  }

  listarPorCategoria(categoriaId: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/buscarCategoria/${categoriaId}`);
  }

  buscar(query: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/buscar`, { params: { query } });
  }

  listarProductosPaginado(page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get(`${this.apiUrl}/listarPaginado`, { params });
  }
}
