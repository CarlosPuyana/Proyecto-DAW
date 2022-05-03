import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Empleado } from './empleado';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(empleado: Empleado): Observable<any> {

    const urlEndpoint = 'http://localhost:8080/login'

    const email = empleado.email
    const password = empleado.password

    const body = {email, password}

    return this.httpClient.post<any>(urlEndpoint, body);
  }

}
