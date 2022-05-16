import { Component, OnInit } from '@angular/core';
import { ProductoResponse } from '../../interfaces/producto.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ProductoService } from '../services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-productos',
  templateUrl: './list-productos.component.html',
  styleUrls: ['./list-productos.component.css']
})

export class ListProductosComponent implements OnInit {

  productos!: ProductoResponse[];
  producto!: ProductoResponse;
  selected!: ProductoResponse;
  jwt:JwtHelperService = new JwtHelperService();

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.findProductos();
  }

  /**
   * Obtiene la id del usuario a través del token
   * @returns
   */
   findIdUser(): number {

    let token = localStorage.getItem("token")!;

    return this.jwt.decodeToken(token).id;
  }

  findProductos() {
    let id = this.findIdUser();

    this.productoService.findProductsByRestaurante(id).subscribe({
      next: (resp => {
        this.productos = resp;
      }), error: (err => {
        Swal.fire('Error', err.error.mensaje, 'error');
      })
    })
  }

}
