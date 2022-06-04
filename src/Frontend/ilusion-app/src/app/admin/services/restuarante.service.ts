import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurante, RestauranteResponse } from '../../interfaces/restaurante.interface';

@Injectable({
  providedIn: 'root'
})
export class RestuaranteService {

  jwt: JwtHelperService = new JwtHelperService();
  private url: string = environment.baseUrl + "api/v1/restaurants"

  constructor(private http: HttpClient) { }

  /**
   * Devuelve la lista de restaurantes
   */
  findRestaurants(): Observable<RestauranteResponse[]> {

    let path = this.url;
    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}` || '');

    return this.http.get<RestauranteResponse[]>(path);
  }

  /**
   * It sends a POST request to the server with the restaurant's data, and returns the response
   * @param {Restaurante} restaurante - Restaurante is the object that we are sending to the backend.
   * @returns A promise of type RestauranteResponse
   */
  createRestaurant(restaurante: Restaurante) {

    let path = this.url;

    const body = {
      nombreRestaurante: restaurante.nombreRestaurante,
      telefono: restaurante.telefono,
      ciudad: restaurante.ciudad,
      codigoPostal: restaurante.codigoPostal,
      direccion: restaurante.direccion
    }

    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token') || ''}`);

    return this.http.post<RestauranteResponse>(path, body, {headers: header});

  }

  deleteRestaurante(id: number) {

    let path = this.url + "/" + id;

    const header = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return this.http.delete(path, {headers: header});
  }


}
