import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PedidoResponse } from '../../interfaces/pedido.interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private url: string = environment.baseUrl + "api/v1/pedidos"

  constructor(private http: HttpClient) { }

  findPedidosByRestaurante(id: number): Observable<PedidoResponse[]> {

    let path = this.url + "/" + id

    const header = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return this.http.get<PedidoResponse[]>(path, {headers: header});

  }

}
