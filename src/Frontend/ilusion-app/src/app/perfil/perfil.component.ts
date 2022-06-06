import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/interfaces/empleado.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { EmpleadoService } from '../admin/services/empleado.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  user!: Empleado;
  errores: string[] = [];
  contrasena!: string;
  jwt: JwtHelperService = new JwtHelperService();
  rol!: string;
  foto!: string;
  archivo!: File;

  modal: boolean = false;

  constructor(private empleadoService: EmpleadoService, private router: Router) { }

  ngOnInit(): void {
    this.cargarUsuario();

  }

  findIdUser() {

    return this.jwt.decodeToken(localStorage.getItem('token')!).id
  }

  getFoto(event: any) {
    const archivoCapturado = event.target.files[0];

    this.archivo = archivoCapturado;

    this.empleadoService.uploadPhoto(this.archivo, this.findIdUser()).subscribe({
      next: resp => {
        Swal.fire('Foto actualizada!', 'La foto de perfil ha sido actualizada', 'success')

        setTimeout(() => {
          window.location.reload()
        }, 2000);

      }
    })

  }

  abrirModal() {
    this.modal = true;
  }
  cerrarModal() {
    this.modal = false;
  }

   /**
   * Carga los datos del usuario para el formulario del perfil
   */
    cargarUsuario() {

      let id = this.jwt.decodeToken(sessionStorage.getItem('token')!).id;

      this.empleadoService.findUserById(id).subscribe({
        next: (user) => {
          this.user = user;
          this.rol = this.user.role.split('_')[1];
          this.foto = "http://localhost:8080/api/v1/users/download/" + this.user.id
        }
    })
  }

     /**
   * Guarda los cambios del perfil
   */
  updatePerfil(): void {

  }


}
