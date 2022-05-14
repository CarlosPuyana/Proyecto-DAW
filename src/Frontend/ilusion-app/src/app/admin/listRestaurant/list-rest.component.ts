import { Component, OnInit } from '@angular/core';
import { RestauranteResponse } from 'src/app/interfaces/restaurante.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RestuaranteService } from '../services/restuarante.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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

  constructor(private servicioRestaurante: RestuaranteService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

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


}
