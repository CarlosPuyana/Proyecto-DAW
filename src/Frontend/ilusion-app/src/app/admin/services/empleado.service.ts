import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Empleado, EmpleadoResponse } from '../../interfaces/empleado.interface';
import { AuthResponse } from 'src/app/interfaces/auth-response.interface';
import { RestauranteResponse } from '../../interfaces/restaurante.interface';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  jwt: JwtHelperService = new JwtHelperService();
  private url: string = environment.baseUrl + "api/v1/users";

  constructor(private http: HttpClient) { }

  uploadPhoto(archivo: File, id: any) {


    let path = this.url + "/upload/" + id;

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}` || '');


    let formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('id', id);

    return this.http.post(path, formData, {headers: headers});

  }

  /**
   * Devuelve el id del usuario a traves del token
   * @returns
   */
  findIdUser(): number {

    let token = localStorage.getItem('token')!;

    return this.jwt.decodeToken(token).id;
  }

  /**
   * Devuelve el rol del usuario desde el token
   * @returns
   */
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

    return this.http.get<EmpleadoResponse[]>(path, {headers: header});
  }

  /**
   * Devuelve un restaurante con el id
   * @param id
   * @returns
   */
  findRestaurante(id: number): Observable<RestauranteResponse> {
    const header = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('token')}` || '');

    let path = environment.baseUrl + "api/v1/duenos/restaurant/" + id;

    return this.http.get<RestauranteResponse>(path, {headers: header});
  }


/**
 * Coge los empleados de un restaurante
 * @param id
 * @returns
 */
  findUsersByRestaurante(id: number): Observable<EmpleadoResponse[]> {

    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}` || '');

    let path = this.url + "/restaurant/" + id;

    return this.http.get<EmpleadoResponse[]>(path, {headers: header});
  }

  /**
   * Devuelve todos los usuarios con el rol
   * @param role
   * @returns
   */
  findUsersByRole(role: string): Observable<EmpleadoResponse[]> {

    let path = this.url + "/roles";

    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}` || '');

    return this.http.get<EmpleadoResponse[]>(path + "?role=" + role, {headers: header})
  }

  /**
   * Insertas un restaurante a un empleado
   * @param user
   * @param rest
   * @returns
   */
  setRestaurant(user: EmpleadoResponse, rest: string) {
    let path = this.url + "/restaurant" + "?nombreRestaurante=" + rest;

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

  /**
   * It takes a user object and an id, and then it sends a PUT request to the API with the user object
   * and the id
   * @param {Empleado} user - Empleado, id: number
   * @param {number} id - number
   * @returns The user that has been updated.
   */
  editUser(user: Empleado, id: number) {
    let path = this.url

    const body = {

      nombre: user.nombre,
      apellidos: user.apellidos,
      role: user.role
    }

    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return this.http.put<EmpleadoResponse>(`${path}/${id}`, body, {headers: header});

  }

  deleteUser(id: number) {

    let path = this.url + "/" + id;

    const header = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return this.http.delete(path, {headers: header});

  }

}
