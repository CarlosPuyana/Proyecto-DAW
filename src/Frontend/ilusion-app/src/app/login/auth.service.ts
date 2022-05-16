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

}
