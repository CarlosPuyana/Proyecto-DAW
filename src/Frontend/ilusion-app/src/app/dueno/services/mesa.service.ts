import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MesaResponse, Mesa } from '../../interfaces/mesa.interface';
import { AuthResponse } from '../../interfaces/auth-response.interface';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

  jwt: JwtHelperService = new JwtHelperService();
  private url: string = environment.baseUrl + "api/v1/mesas"

  constructor(private http: HttpClient) { }

  /**
   *
   * @param id Coge las mesas de un restaurante
   * @returns
   */
  findMesasByRestaurante(id: number): Observable<MesaResponse[]> {

    let path = this.url + "/restaurant/" + id;

    const header = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return this.http.get<MesaResponse[]>(path, {headers: header})

  }

  /**
   * Crea una mesa
   * @param mesa
   * @returns
   */
  createMesa(mesa: Mesa) {

    const body = {
      nombreMesa: mesa.nombreMesa,
      capacidad: mesa.capacidad
    }

    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`);

      return this.http.post<MesaResponse>(this.url, body, {headers: header});
  }

  setRestaurante(mesa: MesaResponse, rest: string) {

    let path = this.url + "/restaurant" + "?nombreRestaurante=" + rest;

    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}` || '');

    const body = {
      nombreMesa: mesa.nombreMesa,
      capacidad: mesa.capacidad
    }

    return this.http.put<AuthResponse>(path, body);
  }

  /**
   * Coge una mesa
   * @param id
   */
  getMesa(id: number): Observable<MesaResponse> {
    let path = this.url;

    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return this.http.get<MesaResponse>(`${path}/${id}`, { headers: header});

  }

  editMesa(mesa: Mesa, id: number) {

    let path = this.url;

    const body = {

      nombreMesa: mesa.nombreMesa,
      capacidad: mesa.capacidad,
      activo: mesa.activo
    }

    console.log(mesa.activo);


    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return this.http.put<MesaResponse>(`${path}/${id}`, body, {headers: header});


  }

}
