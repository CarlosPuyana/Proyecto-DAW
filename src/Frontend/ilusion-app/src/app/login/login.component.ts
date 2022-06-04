import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Empleado } from './empleado';
import { AuthService } from './auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserLogin } from '../interfaces/userLogin.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo: string = 'Por favor inicia sesión'
  empleado: Empleado;
  isLogged = false;
  isLoginFail = false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {

    this.empleado = new Empleado();
  }

  ngOnInit(): void {


    if (this.authService.isAuthenticated()) {

      Swal.fire('Login', `Ya estás autenticado`, 'info');
      this.router.navigate(['/dashboard']);
    } else {

      this.router.navigate(['/login'])
    }
  }

  dataLogin: FormGroup = this.formBuilder.group({

    email: [, [ Validators.required] ],
    password: [, [ Validators.required ]]
  })

  login(){
    const data: UserLogin ={
      "email": this.dataLogin.value.email,
      "password": this.dataLogin.value.password
    }

    this.authService.login(data).subscribe({
      next: resp => {

        console.log(resp.jwt_token);

        // Redirigir y guardar el token en el localStorage
        localStorage.setItem("token",resp.jwt_token);
        sessionStorage.setItem("token", resp.jwt_token);
        sessionStorage.setItem('reload', 'true');

        this.router.navigateByUrl("/dashboard");

      },

      error: err => {

        if (err.status == 0) {
          Swal.fire({
            icon: 'error',
            title: 'Ha ocurrido un error',
            text: 'El servidor está inoperativo'
          });
        } else
          Swal.fire({
            icon: 'error',
            title: 'Ha ocurrido un error',
            text: 'Ha introducido datos incorrectos'
          });
      }
    })
  }

/*
  login(): void {
    console.log(this.empleado);

    const data: UserLogin ={
      "email": this.dataLogin.value.email,
      "password": this.dataLogin.value.password
    }

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
*/
}
