import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Empleado } from './empleado';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo: string = 'Por favor inicia sesión'
  empleado: Empleado;

  constructor(private authService: AuthService, private router: Router) {

    this.empleado = new Empleado();
  }

  ngOnInit(): void {

    if (this.authService.isAuthenticated()) {

      Swal.fire('Login', `Hola ${this.authService.empleado.userName} ya estás autenticado`, 'info');
      this.router.navigate(['/dashboard']);
    }

  }

  login(): void {
    console.log(this.empleado);

    if (this.empleado.email == null || this.empleado.password == null) {

      Swal.fire('Error login', 'Email o password vacias!', 'error' )

      return;
    }

    this.authService.login(this.empleado).subscribe( response => {
      console.log(response);


      this.authService.guardarUsuario(response.jwt_token);
      this.authService.guardarToken(response.jwt_token);

      let usuario = this.authService.empleado;

      this.router.navigate(['/dashboard'])
      Swal.fire('Login', `Hola ${usuario.userName}, has iniciado sesión con éxito`, 'success')
    }, err => {
      if (err.status == 500) Swal.fire('Error login', 'Email o password incorrecto!', 'error' )
    })


  }

}
