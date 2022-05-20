import { Component, OnInit } from '@angular/core';
import { EmpleadoResponse, Empleado } from '../../interfaces/empleado.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoService } from '../services/empleado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user!: EmpleadoResponse;
  jwt: JwtHelperService = new JwtHelperService();;
  errores: string[] = [];
  id!: number;

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute,
    private userService: EmpleadoService, private router: Router) { }

  ngOnInit(): void {

    this.cargarUser();
    this.formCreate.controls['usuario'].disable();
    this.formCreate.controls['email'].disable();

  }

  /**
   * Carga el usuario editado
   */
  cargarUser() {
    this.activatedRoute.params.subscribe(params => {
      this.id= params['id']
      if (this.id) {
        this.userService.findUserById(this.id).subscribe((user) => this.user = user )
      }
    })
  }

  /**
   * Construye el formulario con sus campos y validaciones
   */
   formCreate: FormGroup = this.formBuilder.group({
    usuario: [, [  Validators.required] ],
    email: [, [ Validators.required] ],
    nombre: [, [ Validators.required ] ],
    apellidos: [, [ Validators.required] ],
    role: [, [ Validators.required] ]
  })

  editUser() {

    const data: Empleado = {
      "userName": this.formCreate.value.usuario,
      "email": this.formCreate.value.email,
      "nombre": this.formCreate.value.nombre,
      "apellidos": this.formCreate.value.apellidos,
      "role": this.formCreate.value.role
    }

    this.userService.editUser(data, this.id).subscribe({

      next: user => {

        this.router.navigateByUrl('dashboard/admin/listUsers')
        Swal.fire('Producto Actualizado', `Producto ${this.user.nombre} ${this.user.apellidos} actualizado con éxtio!`, 'success')
      }, error: err => {

        this.errores=err.error.errors as string[];
        console.error(err.error.errors)
      }
    })

  }

}
