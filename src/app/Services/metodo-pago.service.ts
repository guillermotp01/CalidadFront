import { Injectable } from '@angular/core';
import { appsettings } from '../Settings/appSettings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetodoPagoService {

  private apiUrl = appsettings.apiUrl + "/mercadoPago";

  constructor(private http: HttpClient) {
  }

  crearPreferencia(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear-preferencia`, data);
  }
}
