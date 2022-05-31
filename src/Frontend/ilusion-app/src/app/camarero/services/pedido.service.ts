import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Pedido } from '../pedido';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private url: string = environment.baseUrl + "api/v1/pedidos"

  constructor(private http: HttpClient) { }

  create(pedido: Pedido): Observable<Pedido> {

    const header = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('token')}`);


    return this.http.post<Pedido>(this.url, pedido, {headers: header})
  }

}
