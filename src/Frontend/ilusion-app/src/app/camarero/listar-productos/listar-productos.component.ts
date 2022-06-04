import { Component, OnInit } from '@angular/core';
import { ProductoResponse } from '../../interfaces/producto.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MenuItem } from 'primeng/api';
import { ProductoService } from '../../dueno/services/producto.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {

  productos!: ProductoResponse[];
  producto!: ProductoResponse;
  jwt:JwtHelperService = new JwtHelperService();

  cols: any[] = [];
  selectedProduct?: ProductoResponse;

  constructor(private productoService: ProductoService, private router: Router) { }

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
        console.log(this.productos + " ajam");

        this.productos = resp;
      }), error: (err => {
        Swal.fire('Error', err.error.mensaje, 'error');
      })
    })
  }

}
