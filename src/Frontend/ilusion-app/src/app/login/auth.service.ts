import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserLogin } from '../interfaces/userLogin.interface';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { Empleado } from '../interfaces/empleado.interface';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwt:JwtHelperService = new JwtHelperService();
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

  isAuthenticated(): boolean {

    let payload = null;
    payload = this.jwt.decodeToken(localStorage.getItem('token')!);

    if (payload != null && payload.email.length > 0) {

      return true;
    } else {

      payload = null;
      return false;
    }

  }

  logout(): void {

    window.localStorage.clear();
    window.sessionStorage.clear();
  }

  hasRole(rol: string): boolean {

    let payload = this.jwt.decodeToken(localStorage.getItem('token')!);

    if (payload.rol.includes(rol)) return true;

    return false;
  }

}
