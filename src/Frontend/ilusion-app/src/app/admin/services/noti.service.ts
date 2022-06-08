import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notificaciones } from 'src/app/interfaces/noti.interface';
import { NotificacionesResponse } from '../../interfaces/noti.interface';

@Injectable({
  providedIn: 'root'
})
export class NotiService {

  jwt: JwtHelperService = new JwtHelperService();
  private url: string = environment.baseUrl + "api/v1/noti";

  constructor(private http: HttpClient) { }

  getNotiByRestaurante(id: number): Observable<NotificacionesResponse[]> {

    let path = this.url + `/restaurant/${id}`;

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}` || '');

      return this.http.get<NotificacionesResponse[]>(path, {headers: headers});

  }

}
