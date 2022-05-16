import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserLogin } from '../interfaces/userLogin.interface';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { Empleado } from '../interfaces/empleado.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _token!: string;

  constructor(private http: HttpClient) { }

  validateToken(): Observable<AuthResponse> {

    let url = environment.baseUrl + "api/v1/auth";
    const httpHeaders = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return this.http.get<AuthResponse>(url, {headers: httpHeaders});
  }

  login(data: UserLogin) {

    let url = environment.baseUrl + "api/v1/auth/login";
    const body = {
      "email": data.email,
      "password": data.password
    }


    return this.http.post<AuthResponse>(url, body);
  }

  createUser(user: Empleado) {

    let url = environment.baseUrl + "api/v1/users";

    const body = {
      nombre: user.nombre,
      apellidos: user.apellidos,
      userName: user.userName,
      email: user.email,
      role: user.role,
      password: user.password
    }

    const httpHeaders = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return this.http.post<AuthResponse>(url, body, {headers: httpHeaders});
  }

/*

  public get empleado(): Empleado {
    if (this._empleado != null) {

      return this._empleado;
    } else if (this._empleado == null && sessionStorage.getItem('usuario') != null) {

      this._empleado = JSON.parse(sessionStorage.getItem('usuario') || "[]") as Empleado;

      return this._empleado;

    }

    return new Empleado();
  }

  public get token(): any {
    if (this._token != null) {

      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {

      this._token = sessionStorage.getItem('token')!;

      return this._token;
    }

    return null;
  }

  login(empleado: Empleado): Observable<any> {

    const urlEndpoint = 'http://localhost:8080/api/v1/auth/login'

    const email = empleado.email
    const password = empleado.password

    const body = {email, password}

    return this.http.post<any>(urlEndpoint, body);
  }

  guardarUsuario(accessToken: string): void {

    let payload = this.obtenerDatosToken(accessToken);

    this._empleado = new Empleado();

    this._empleado.email = payload.email;
    this._empleado.role = payload.rol;
    this._empleado.userName = payload.username;

    sessionStorage.setItem('usuario', JSON.stringify(this._empleado));

  }

  guardarToken(accessToken: string): void {

    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);

  }

  obtenerDatosToken(accessToken: string): any {

    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]))
    }

    return null;
  }

  isAuthenticated(): boolean {

    let payload = null;

    payload = this.obtenerDatosToken(this.token);

    if (payload != null && payload.username && payload.username.length > 0) {

      return true
    }
    else  {
       payload = null
       return false;
    }


  }

  logout(): void {
    window.sessionStorage.clear();

  }
*/

  hasRole(role: string): boolean {

    /* if (this._empleado.role.includes(role)) return true; */

    return false;
  }

}
