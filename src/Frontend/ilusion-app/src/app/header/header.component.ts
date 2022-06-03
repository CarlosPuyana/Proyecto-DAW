import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { EmpleadoResponse } from '../interfaces/empleado.interface';
import { EmpleadoService } from '../admin/services/empleado.service';
import { AuthService } from '../login/auth.service';
import Swal from 'sweetalert2';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  user!: EmpleadoResponse;
  nombre!: string;
  jwt:JwtHelperService = new JwtHelperService();

  constructor(public authService: AuthService, private router: Router, private empleadoService: EmpleadoService) { }

  ngOnInit(): void {
    this.findInfoUser();
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

  logout(): void {

    Swal.fire('LogOut', 'Has cerrado sesión con éxito', 'success');

    this.router.navigate(['/login']);

    this.authService.logout();

  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

}
