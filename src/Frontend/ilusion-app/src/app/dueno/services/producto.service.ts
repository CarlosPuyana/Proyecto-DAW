import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ProductoResponse } from 'src/app/interfaces/producto.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  jwt: JwtHelperService = new JwtHelperService();
  private url: string = environment.baseUrl + "api/v1/products"


  constructor(private http: HttpClient) { }

  findProductsByRestaurante(id: number): Observable<ProductoResponse[]> {

    let path = this.url + "/restaurant/" + id;

    return this.http.get<ProductoResponse[]>(path);
  }
}
