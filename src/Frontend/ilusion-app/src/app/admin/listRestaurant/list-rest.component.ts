import { Component, OnInit } from '@angular/core';
import { RestauranteResponse } from 'src/app/interfaces/restaurante.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RestuaranteService } from '../services/restuarante.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MenuItem } from 'primeng/api';
import { ProductoResponse } from '../../interfaces/producto.interface';

@Component({
  selector: 'app-list-rest',
  templateUrl: './list-rest.component.html',
  styleUrls: ['./list-rest.component.css']
})
export class ListRestComponent implements OnInit {

  restaurantes!: RestauranteResponse[];
  restaurante!: RestauranteResponse;
  selected!: RestauranteResponse;
  dialog!: boolean;
  dialogSave!: boolean;
  formGroupEdit!: FormGroup;

  cols: any[] = [];
  items: MenuItem[] = [];
  selectedRestaurante?: RestauranteResponse;

  constructor(private servicioRestaurante: RestuaranteService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.items = [
      {
        label: "Nuevo",
        icon: 'pi pi-fw pi-user-plus',
        command: () => this.crearRestaurante()
      },

      {
        label: "Eliminar",
        icon: "pi pi-trash",
        command: () => this.deleteRestaurante()
      }
    ]

    this.findRestaurants();
  }

  /**
   * Obtiene la lista de restaurantes
   */
  findRestaurants() {

    this.servicioRestaurante.findRestaurants().subscribe({
      next: (resp => {
        this.restaurantes = resp;
      }),
      error: (err => {
        Swal.fire('Error!', err.error.mensaje, 'error');
      })
    })
  }

  /**
   * This function navigates to the createRestaurant component
   */
  crearRestaurante(): void {

      this.router.navigateByUrl('dashboard/admin/createRestaurant')

  }

  /**
   * It deletes the selected restaurant
   */
  deleteRestaurante() {

    if (this.selectedRestaurante?.id != null) {

      Swal.fire({
        title: 'Completar pedido',
        text: `Deseas eliminar a ${this.selectedRestaurante?.nombreRestaurante}. ¿Deseas eliminar el restaurante?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar restaurante!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Restaurante eliminado!',
            'El restaurante ha sido eliminado.',
            'success'
          )

          this.servicioRestaurante.deleteRestaurante(this.selectedRestaurante!.id).subscribe();
        }
      })
    }

  }

}
