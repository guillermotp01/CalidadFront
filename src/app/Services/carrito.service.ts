import { Injectable, inject } from '@angular/core';
import { Producto } from '../Models/Productos';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { appsettings } from '../Settings/appSettings';
import { ResponseAPI } from '../Models/ResponseAPI';
import { Carrito } from '../Models/Carrito';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private http=inject(HttpClient);
  private apiUrl: string = appsettings.apiUrl + "/carrito";


  constructor() { }

  
  agregarProducto(productoId: number, cantidad: number) {
    const body = { productoId, cantidad };
    return this.http.post<ResponseAPI>(`${this.apiUrl}/agregar`, body);
  }

  obtenerProductos(): Observable<Carrito[]> {
    return this.http.get<Carrito[]>(`${this.apiUrl}/listar`);
  }
  
  eliminarDetalleCarrito(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/eliminar/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /*
  confirmarCompra(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/confirmar`, {});
  }*/
  
  confirmarCompra(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/confirmar`, {}, { headers });
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error al eliminar el producto', error);
    return throwError(error);
  }

}
