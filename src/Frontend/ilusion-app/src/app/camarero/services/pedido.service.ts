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

  /**
   * It creates a new Pedido object and sends it to the server
   * @param {Pedido} pedido - Pedido - The object that we want to send to the server.
   * @returns An observable of Pedido
   */
  create(pedido: Pedido): Observable<Pedido> {


    const header = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('token')}`);


    return this.http.post<Pedido>(this.url, pedido, {headers: header})
  }

  /**
   * It returns an observable of type Pedido, which is a class that represents a Pedido object
   * @param {number} id - number
   * @returns An observable of Pedido
   */
  findPedido(id: number): Observable<Pedido> {
    const header = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    let path = this.url + "/" + id;

    return this.http.get<Pedido>(path, {headers: header})
  }

  /**
   * It updates a pedido in the database
   * @param {Pedido} pedido - Pedido - The object that will be updated.
   * @returns An observable of type Pedido
   */
  updatePedido(pedido: Pedido, idPedido: number): Observable<Pedido> {
    const header = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    console.log(pedido);


    let path = this.url + "/" + idPedido;

    return this.http.put<Pedido>(path, pedido, {headers: header})

  }

}
