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
  }

  login(): void {
    console.log(this.empleado);

    if (this.empleado.email == null || this.empleado.password == null) {

      Swal.fire('Error login', 'Email o password vacias!', 'error' )

      return;
    }

    this.authService.login(this.empleado).subscribe( response => {
      console.log(response);
      let payload = JSON.parse(atob(response.jwt_token.split(".")[1]))
      console.log(payload)
      response
      this.router.navigate(['/dashboard'])
      Swal.fire('Login', `Hola ${payload.username}, has iniciado sesión con éxito`, 'success')
    }
    )

  }

}
