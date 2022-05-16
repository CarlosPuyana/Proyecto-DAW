import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Empleado, EmpleadoResponse } from '../../interfaces/empleado.interface';
import { AuthResponse } from 'src/app/interfaces/auth-response.interface';

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

  findUsersByRestaurante(id: number): Observable<EmpleadoResponse[]> {

    let path = this.url + "/restaurant/" + id;

    return this.http.get<EmpleadoResponse[]>(path);
  }

  findUsersByRole(role: string): Observable<EmpleadoResponse[]> {

    let path = this.url + "/roles";

    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}` || '');

    return this.http.get<EmpleadoResponse[]>(path + "?role=" + role)
  }

  setRestaurant(user: EmpleadoResponse, rest: string) {
    let path = this.url + "/restaurant" + "?nombreRestaurante=" + rest;

    console.log(user);


    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}` || '');

    const body = {
      nombre: user.nombre,
      apellidos: user.apellidos,
      email: user.email,
      role: user.role,
      userName: user.userName
    }

    return this.http.put<AuthResponse>(path, body, {headers: header});
  }

}
