import { Component, OnInit } from '@angular/core';
import { MesaResponse, Mesa } from '../../interfaces/mesa.interface';
import { RestauranteResponse } from '../../interfaces/restaurante.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MesaService } from '../services/mesa.service';
import { EmpleadoService } from '../../admin/services/empleado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-mesa',
  templateUrl: './crear-mesa.component.html',
  styleUrls: ['./crear-mesa.component.css']
})
export class CrearMesaComponent implements OnInit {

  nuevoMesa!: MesaResponse;
  idRestaurante!: RestauranteResponse;
  jwt: JwtHelperService = new JwtHelperService();

  constructor(private formBuilder: FormBuilder, private router: Router, private mesaService: MesaService, private empleadoService: EmpleadoService) { }

  ngOnInit(): void {
  }

 /**
   * Construye el formulario con sus campos y validaciones
   */
  formCreate: FormGroup = this.formBuilder.group({
    nombreMesa: [, [ Validators.required] ],
    capacidad: [, [ Validators.required] ],
  })

  registerMesa() {

    const data: Mesa = {
      "nombreMesa": this.formCreate.value.nombreMesa,
      "capacidad": this.formCreate.value.capacidad
    }

    this.mesaService.createMesa(data).subscribe({
      next: resp => {

        this.nuevoMesa = resp;

        this.empleadoService.findRestaurante(this.jwt.decodeToken(localStorage.getItem('token')!).id).subscribe({
          next: resp2 => {
            this.idRestaurante = resp2;

            this.mesaService.setRestaurante(this.nuevoMesa, this.idRestaurante.nombreRestaurante).subscribe({
              next: resp3 => {

                Swal.fire('Mesa creada', 'La mesa fue creada con éxito', 'success');
                this.router.navigateByUrl("/dashboard/dueno/listMesa")

                setTimeout(() => {
                  window.location.reload()
                }, 2000);

              }, error: err => {

                console.log(err);

                if (err.status == 0) {

                  alert('El servidor está inoperativo en estos momentos');
                } else {

                  Swal.fire('Error!', err.error.mensaje, 'error');
                }

              }
            })
          }
        })
      }
    })
  }


}
