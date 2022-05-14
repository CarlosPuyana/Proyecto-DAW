import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { EmpleadoResponse } from '../../interfaces/empleado.interface';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  jwt: JwtHelperService = new JwtHelperService();
  private url: string = environment.baseUrl + "api/v1/users";

  constructor(private http: HttpClient) { }

  findIdUser(): number {

    let token = localStorage.getItem('token')!;

    return this.jwt.decodeToken(token).id;
  }

  findRolUser(): string {

    let token = localStorage.getItem('token')!;

    return this.jwt.decodeToken(token).rol;
  }

  /**
   * Obtiene el usuario a traves de su id
   */
  findUserById(id: number): Observable<EmpleadoResponse> {

    let path = this.url + `/${id}`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}` || '');

      return this.http.get<EmpleadoResponse>(path, {headers: headers});
  }

  /**
   * Devuelve la lista de usuarios
   */
  findUsers(): Observable<EmpleadoResponse[]> {

    let path = this.url;
    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}` || '');

    return this.http.get<EmpleadoResponse[]>(path);
  }

}
