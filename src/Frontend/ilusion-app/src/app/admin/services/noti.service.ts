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

  /**
   * It's a function that returns an observable of an array of NotificacionesResponse objects
   * @param {number} id - number
   * @returns an array of NotificacionesResponse objects.
   */
  getNotiByRestaurante(id: number): Observable<NotificacionesResponse[]> {

    let path = this.url + `/restaurant/${id}`;

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}` || '');

      return this.http.get<NotificacionesResponse[]>(path, {headers: headers});

  }

  /**
   * It sends a POST request to the server with the body of the request being the notification object
   * @param {Notificaciones} noti - Notificaciones
   * @returns An observable of type NotificacionesResponse
   */
  crearNoti(noti: Notificaciones): Observable<NotificacionesResponse> {

    let path = this.url;

    const body = {
      mensaje: noti.mensaje
    }

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}` || '');

    return this.http.post<NotificacionesResponse>(path, body, {headers: headers});
  }

  setRestaurant(noti: NotificacionesResponse, emplId: number): Observable<NotificacionesResponse> {

    let path = this.url + "/restaurant/" + emplId;

    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}` || '');

    const body = {
      mensaje: noti.mensaje
    }

    return this.http.put<NotificacionesResponse>(path, body, {headers: header});

  }

}
