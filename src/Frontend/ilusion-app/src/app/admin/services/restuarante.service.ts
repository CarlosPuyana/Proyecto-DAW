import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RestauranteResponse } from '../../interfaces/restaurante.interface';

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

}
