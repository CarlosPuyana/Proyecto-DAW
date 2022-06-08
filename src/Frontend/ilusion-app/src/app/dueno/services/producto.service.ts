import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Producto, ProductoResponse } from 'src/app/interfaces/producto.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthResponse } from 'src/app/interfaces/auth-response.interface';
import { ProductoClass } from 'src/app/camarero/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  jwt: JwtHelperService = new JwtHelperService();
  private url: string = environment.baseUrl + "api/v1/products"

  private header = new HttpHeaders()
  .set('Authorizationn', `Bearer ${localStorage.getItem('token')}` || '');



  constructor(private http: HttpClient) { }

  findProductByNombre(nombre: string): Observable<ProductoClass> {

    let path = this.url + "?nombre=" + nombre;

    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`);


    return this.http.get<ProductoClass>(path, {headers: header});
  }

  /**
   * Te da los productos del restaurante del usuario
   * @param id
   * @returns
   */
  findProductsByRestaurante(id: number): Observable<ProductoResponse[]> {

    let path = this.url + "/restaurant/" + id;

    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`);


    return this.http.get<ProductoResponse[]>(path, {headers: header});
  }

  createProducto(producto: Producto) {

    let url = environment.baseUrl + "api/v1/products";

    const body = {
      nombreProducto: producto.nombreProducto,
      descripcion: producto.descripcion,
      precio: producto.precio
    }

    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return this.http.post<ProductoResponse>(url, body, {headers: header});

  }

  /**
   * Coge un producto a traves de una id
   * @param id
   * @returns
   */
  getProducto(id: number): Observable<ProductoResponse> {

    let url = environment.baseUrl + "api/v1/products"

    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return this.http.get<ProductoResponse>(`${url}/${id}`, { headers: header});

  }

  editProducto(prod: Producto, id: number) {
    let url = environment.baseUrl + "api/v1/products";

    const body = {
      nombreProducto: prod.nombreProducto,
      descripcion: prod.descripcion,
      precio: prod.precio
    }

    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return this.http.put<ProductoResponse>(`${url}/${id}`, body, {headers: header});

  }

/**
 * Insertas un restaurante a un producto
 * @param prod
 * @param rest
 * @returns
 */
  setRestaurant(prod: ProductoResponse, rest: string) {

    let path = this.url + "/restaurant" + "?nombreRestaurante=" + rest;

    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}` || '');


    const body = {
      nombreProducto: prod.nombreProducto,
      descripcion: prod.descripcion,
      precio: prod.precio
    }

    return this.http.put<AuthResponse>(path, body);
  }


}
