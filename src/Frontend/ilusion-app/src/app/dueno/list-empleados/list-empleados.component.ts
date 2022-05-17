import { Component, OnInit } from '@angular/core';
import { EmpleadoResponse } from '../../interfaces/empleado.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpleadoService } from '../../admin/services/empleado.service';
import { PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {

  empleados!: EmpleadoResponse[];
  empleado!: EmpleadoResponse;
  selected!: EmpleadoResponse;
  dialog!: boolean;
  dialogSave!: boolean;
  formGroupEdit!: FormGroup;
  jwt:JwtHelperService = new JwtHelperService();

  constructor(private serviceEmpleado: EmpleadoService, private primengConfig: PrimeNGConfig, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.findUser();
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
   * Obtiene la lista de usuarios
   */
  findUser() {

    let id = this.findIdUser();

    this.serviceEmpleado.findUsersByRestaurante(id).subscribe({
      next: (resp => {
        this.empleados = resp;
      }), error: (err => {
        Swal.fire('Error!', err.error.mensaje, 'error');
      })
    })
  }



}
