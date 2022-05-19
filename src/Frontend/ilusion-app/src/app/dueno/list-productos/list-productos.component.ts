import { Component, OnInit } from '@angular/core';
import { ProductoResponse } from '../../interfaces/producto.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ProductoService } from '../services/producto.service';
import Swal from 'sweetalert2';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-productos',
  templateUrl: './list-productos.component.html',
  styleUrls: ['./list-productos.component.css']
})

export class ListProductosComponent implements OnInit {

  productos!: ProductoResponse[];
  producto!: ProductoResponse;
  jwt:JwtHelperService = new JwtHelperService();

  cols: any[] = [];
  items: MenuItem[] = [];
  selectedProduct?: ProductoResponse;

  constructor(private productoService: ProductoService, private router: Router) { }

  ngOnInit(): void {
    this.findProductos();

    this.cols = [
      {field: "nombreProducto", header: "Producto"},
      {field: "descripcion", header: "Descripción"},
      {field: "precio", header: "Precio"},
    ]

    this.items = [
      {
        label: "Nuevo",
        icon: 'pi pi-fw pi-user-plus',
        command: () => this.crearEditarProducto(false)
      },
      {
        label: 'Editar',
        icon: 'pi pi-fw pi-user-edit',
        command: () => this.crearEditarProducto(true)
      },
      {
        label: "Eliminar",
        icon: "pi pi-trash"
      }
    ]

  }


  crearEditarProducto(editar: boolean) {

    if (editar) {

      if (this.selectedProduct?.id != null) {

        this.router.navigateByUrl('dashboard/dueno/editarProducto/' + this.selectedProduct?.id)
      } else {

        return;
      }

    } else {

      this.router.navigateByUrl('dashboard/dueno/crearProducto')
    }
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
