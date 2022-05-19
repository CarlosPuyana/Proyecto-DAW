import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Producto, ProductoResponse } from '../../interfaces/producto.interface';
import { ProductoService } from '../services/producto.service';
import Swal from 'sweetalert2';
import { EmpleadoService } from '../../admin/services/empleado.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RestauranteResponse } from '../../interfaces/restaurante.interface';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  nuevoProducto!: ProductoResponse;
  idRestaurante!: RestauranteResponse;
  jwt:JwtHelperService = new JwtHelperService();

  constructor(private formBuilder: FormBuilder, private router: Router, private productoService: ProductoService, private empleadoService: EmpleadoService) { }

  ngOnInit(): void {
  }

  /**
   * Construye el formulario con sus campos y validaciones
   */
  formCreate: FormGroup = this.formBuilder.group({
    nombreProducto: [, [ Validators.required] ],
    descripcion: [, [ Validators.required] ],
    precio: [, [ Validators.required ] ],
  })

  registerProducto() {

    const data: Producto = {
      "nombreProducto": this.formCreate.value.nombreProducto,
      "descripcion": this.formCreate.value.descripcion,
      "precio": this.formCreate.value.precio
    }

    this.productoService.createProducto(data).subscribe({
      next: racano => {

        this.nuevoProducto = racano;

        this.empleadoService.findRestaurante(this.jwt.decodeToken(localStorage.getItem('token')!).id).subscribe({
          next: resp2 => {

            this.idRestaurante = resp2;

            this.productoService.setRestaurant(this.nuevoProducto, this.idRestaurante.nombreRestaurante).subscribe({
              next: resp3 => {

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

        // Redirigimos a la lista
        this.router.navigateByUrl("/dashboard/dueno/listProductos")

      }, error: err => {
        console.log(err);

        if (err.status == 0) {

          alert("El servidor está inoperativo en estos momentos");
        } else {

          Swal.fire('Error!', err.error.mensaje, 'error');
        }
      }
    })


  }

}
