import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  jwt:JwtHelperService=new JwtHelperService();
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(public authService: AuthService, private router: Router, private http: HttpClient) { }

  logout(): void {

    Swal.fire('LogOut', 'Has cerrado sesión con éxito', 'success');

    this.router.navigate(['/login']);

    this.authService.logout();

  }



  ngOnInit(): void {

  }

  /**
   * Obtiene la id del usuario a través del token
   * @returns
   */
  findIdUser(): number {

    let token = localStorage.getItem("token")!;

    return this.jwt.decodeToken(token).id;
  }

  /**
   * Obtiene el rol del usuario a través del token
   * returns
   */
  findRolUser(): string {

    let token = localStorage.getItem("token")!;

    return this.jwt.decodeToken(token).rol;
  }



}
