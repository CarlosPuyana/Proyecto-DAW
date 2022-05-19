import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MesaResponse } from '../../interfaces/mesa.interface';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

  jwt: JwtHelperService = new JwtHelperService();
  private url: string = environment.baseUrl + "api/v1/mesas"

  constructor(private http: HttpClient) { }

  findMesasByRestaurante(id: number): Observable<MesaResponse[]> {

    let path = this.url + "/restaurant" + id;

    const header = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return this.http.get<MesaResponse[]>(path, {headers: header})

  }

}
