import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { EmpleadoService } from '../admin/services/empleado.service';
import { EmpleadoResponse } from '../interfaces/empleado.interface';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  jwt:JwtHelperService = new JwtHelperService();

  nombre!: string;
  apellidos!: string;
  user!: EmpleadoResponse;

  constructor(public authService: AuthService, private router: Router, private http: HttpClient, private empleadoService: EmpleadoService) { }

  logout(): void {

    Swal.fire('LogOut', 'Has cerrado sesión con éxito', 'success');

    this.router.navigate(['/login']);

    this.authService.logout();

  }

  primeraVez() {

    const prm = sessionStorage.getItem('reload')

    if (prm === 'true') {
      window.location.reload()
      sessionStorage.removeItem('reload')
    }
  }

  ngOnInit(): void {
    this.findInfoUser()
    this.primeraVez();
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
   * Obtiene informacion de un usuario
   */
  findInfoUser() {

    let id = this.findIdUser();

    this.empleadoService.findUserById(id).subscribe({
      next: resp => {

        this.user = resp;

        this.nombre = this.user.nombre
        this.apellidos = this.user.apellidos

      }, error: err => {

        console.log(err);

        if (err.status == 0) {

          alert("El servidor está inoperativo en estos momentos")
        } else {

          Swal.fire('Error!', err.error.mensaje, 'error');
        }
      }
    })

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
