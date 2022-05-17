import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Restaurante } from '../../interfaces/restaurante.interface';
import { RestuaranteService } from '../services/restuarante.service';
import Swal from 'sweetalert2';
import { EmpleadoService } from '../services/empleado.service';
import { Empleado, EmpleadoResponse } from 'src/app/interfaces/empleado.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-restaurant',
  templateUrl: './create-restaurant.component.html',
  styleUrls: ['./create-restaurant.component.css']
})
export class CreateRestaurantComponent implements OnInit {

  duenos!: EmpleadoResponse[];
  manito!: EmpleadoResponse;
  optionDefault: string = "Seleccione un dueño";
  list: EmpleadoResponse[] = this.duenos;
  id!: number;


  constructor(private formBuilder: FormBuilder, private router: Router, private restaurantService: RestuaranteService, private empleadoService: EmpleadoService) { }

  ngOnInit(): void {
    this.findDuenos()
  }

  /**
   * Construye el formulario con sus campos y validaciones
   */
  formCreate: FormGroup = this.formBuilder.group({
    nombreRestaurante: [, [ Validators.required] ],
    telefono: [, [ Validators.required, Validators.pattern("^[0-9]{9}$")] ],
    direccion: [, [ Validators.required ] ],
    ciudad: [, [ Validators.required ] ],
    codigoPostal: [, [ Validators.required, Validators.pattern("^[0-9]{5}$") ] ],
    dueno: [, [ Validators.required]]
  })



  /**
   * Muestra los dueños
   */
  findDuenos() {

    this.empleadoService.findUsersByRole('ROLE_DUENO').subscribe({
      next: (resp => {

        this.duenos = resp;

      }), error: (err => {
        console.log(err.error.mensaje);
      })
    })
  }

  /**
   * Metodo para crear un Restaurantne
   */
  registerRestaurant() {


    const data: Restaurante = {
      "nombreRestaurante": this.formCreate.value.nombreRestaurante,
      "telefono": this.formCreate.value.telefono,
      "direccion": this.formCreate.value.direccion,
      "ciudad": this.formCreate.value.ciudad,
      "codigoPostal": this.formCreate.value.codigoPostal
    }

    this.restaurantService.createRestaurant(data).subscribe({
      next: resp => {

        this.empleadoService.findUserById(this.formCreate.value.dueno).subscribe({

          next: (resp2 => {
            this.manito = resp2;
            this.empleadoService.setRestaurant(this.manito, this.formCreate.value.nombreRestaurante).subscribe({
              next: resp => {

              }, error: err => {
                console.log(err);

                if (err.status == 0) {
                  alert("El servidor está inoperativo en estos momentos")
                } else {
                  Swal.fire('Error!', err.error.mensaje, 'error');
                }
              }
            })

          }) , error: err => {
            console.log(err);

            if (err.status == 0) {
              alert("El servidor está inoperativo en estos momentos")
            } else {
              Swal.fire('Error!', err.error.mensaje, 'error');
            }
          }
        })

        // Redirigimos a la lista
        this.router.navigateByUrl("/dashboard/admin/listRestaurants");
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
