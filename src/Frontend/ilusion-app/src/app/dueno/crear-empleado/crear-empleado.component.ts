import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadoService } from '../../admin/services/empleado.service';
import { AuthService } from '../../login/auth.service';
import { Empleado, EmpleadoResponse } from '../../interfaces/empleado.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RestauranteResponse } from '../../interfaces/restaurante.interface';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.css']
})
export class CrearEmpleadoComponent implements OnInit {

  optionDefault: string = "Seleccione un rol";
  nuevoEmpleado!: EmpleadoResponse;
  idRestaurante!: RestauranteResponse;
  jwt:JwtHelperService = new JwtHelperService();

  constructor(private formBuilder: FormBuilder, private router: Router, private empleadoService: EmpleadoService, private serviceAuth: AuthService) { }

  ngOnInit(): void {
  }

  /**
   * Construye el formulario con sus campos y validaciones
   */
  formCreate: FormGroup = this.formBuilder.group({
    userName: [, [ Validators.required ] ],
    email: [, [ Validators.required, Validators.email ] ],
    name: [, [ Validators.required, Validators.maxLength(30), ] ],
    apellidos: [, [ Validators.required ], ],
    role: [ 'Elige un rol', [ Validators.required ] ]
  })

  /**
   * Crea un empleado y lo registra en el restaurante del dueño
   */
  registerUser() {

    const data: Empleado = {
      "email": this.formCreate.value.email,
      "userName": this.formCreate.value.userName,
      "nombre": this.formCreate.value.name,
      "apellidos": this.formCreate.value.apellidos,
      "role": this.formCreate.value.role
    }

    this.serviceAuth.createEmpleado(data).subscribe({
      next: resp => {

        this.nuevoEmpleado = resp;

        this.empleadoService.findRestaurante(this.jwt.decodeToken(localStorage.getItem('token')!).id).subscribe({
          next: resp2 => {

            this.idRestaurante = resp2;

            this.empleadoService.setRestaurant(this.nuevoEmpleado, this.idRestaurante.nombreRestaurante).subscribe({
              next: resp3  => {

              }, error: err  => {

                console.log(err);

                if (err.status == 0) {

                  alert("El servidor está inoperativo en estos momentos")
                } else {

                  Swal.fire('Error!', err.error.mensaje, 'error');
                }
              }
            })
          }
        })

        // Redirigimos a la lista
        this.router.navigateByUrl("/dashboard/dueno/listEmpleados");
    },error: err => {
      console.log(err);

      if (err.status == 0) {

        alert("El servidor está inoperativo en estos momentos")
      } else {

        Swal.fire('Error!', err.error.mensaje, 'error');
      }

    }
  });

}

}
