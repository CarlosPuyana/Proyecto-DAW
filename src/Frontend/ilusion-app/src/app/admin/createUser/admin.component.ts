import { Component, OnInit } from '@angular/core';
import { Empleado } from '../../interfaces/empleado.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpleadoService } from '../services/empleado.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/login/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  optionDefault: string = "Seleccione un rol";


  constructor(private formBuilder: FormBuilder, private router: Router, private empleadoService: EmpleadoService, private serviceAuth: AuthService) { }

  ngOnInit(): void {
  }

  /**
   * Construye el formulario con sus campos y validaciones
   */
   formCreate: FormGroup = this.formBuilder.group({

    userName: [, [ Validators.required ] ],
    email: [, [ Validators.required, Validators.email] ],
    name: [ , [ Validators.required, Validators.maxLength(30), ] ],
    apellidos: [ , [ Validators.required], ],
    role: [ 'Elige un rol', [ Validators.required ]  ]
  })

  /**
   * Metodo para registrar usuarios
   */
  registerUser() {

    const data: Empleado = {

      "email": this.formCreate.value.email,
      "userName": this.formCreate.value.userName,
      "nombre": this.formCreate.value.name,
      "apellidos": this.formCreate.value.apellidos,
      "role": this.formCreate.value.role

    }

      this.serviceAuth.createUser(data).subscribe({
        next: resp => {
          // Redirigimos a la lista
          this.router.navigateByUrl("/dashboard/admin/listUsers");
        },
        error: err => {
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
