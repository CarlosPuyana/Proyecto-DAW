import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido, PedidoResponse } from '../../interfaces/pedido.interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private url: string = environment.baseUrl + "api/v1/pedidos"

  constructor(private http: HttpClient) { }

  /**
   * Coge los pedidos de un restaurante
   * @param id
   * @returns
   */
  findPedidosByRestaurante(id: number): Observable<PedidoResponse[]> {

    let path = this.url + "/restaurante/" + id

    const header = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return this.http.get<PedidoResponse[]>(path, {headers: header});
  }

  /**
   * Coge los pedidos activos de un restaurante
   * @param id
   * @returns
   */
   findPedidosByRestauranteActivos(id: number): Observable<PedidoResponse[]> {

    let path = this.url + "/restaurante/activos/" + id

    const header = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return this.http.get<PedidoResponse[]>(path, {headers: header});
  }

  /**
   * Coge los pedidos por realizar de un restaurante
   * @param id
   * @returns
   */
   findPedidosByRestaurantePorRealizar(id: number): Observable<PedidoResponse[]> {

    let path = this.url + "/restaurante/norealizado/" + id

    const header = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return this.http.get<PedidoResponse[]>(path, {headers: header});
  }

  /**
   * Coge los pedidos inactivos de un restaurante
   * @param id
   * @returns
   */
   findPedidosByRestauranteInactivos(id: number): Observable<PedidoResponse[]> {

    let path = this.url + "/restaurante/inactivos/" + id

    const header = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return this.http.get<PedidoResponse[]>(path, {headers: header});
  }

  /**
   * Coge un pedido en concreto
   * @param id
   * @returns
   */
  getPedidoById(id: number): Observable<PedidoResponse> {

    let path = this.url + "/" + id;

    const header = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return this.http.get<PedidoResponse>(path, {headers: header});
  }

  editarPedido(id: number, pedido: Pedido): Observable<PedidoResponse> {

    let path = this.url + "/" + id;

    const header = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return this.http.put<PedidoResponse>(path, pedido, {headers: header});
  }

}
