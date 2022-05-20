import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoService } from '../../admin/services/empleado.service';
import { ProductoService } from '../services/producto.service';
import { ProductoResponse, Producto } from '../../interfaces/producto.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  producto!: ProductoResponse;
  jwt:JwtHelperService = new JwtHelperService();
  errores:string[]=[];
  id!: number;

  constructor(private formBuilder: FormBuilder,  private activatedRoute: ActivatedRoute, private router: Router, private productoService: ProductoService, private empleadoService: EmpleadoService) { }

  ngOnInit(): void {
  this.cargarProducto();
  }

  /**
   * Carga la info del producto a editar
   */
  cargarProducto() {

    this.activatedRoute.params.subscribe(params => {
      this.id= params['id']
      if (this.id) {
        this.productoService.getProducto(this.id).subscribe((producto) => this.producto = producto )
      }
    })
  }

  /**
   * Construye el formulario con sus campos y validaciones
   */
   formCreate: FormGroup = this.formBuilder.group({
    nombreProducto: [, [ Validators.required] ],
    descripcion: [, [ Validators.required] ],
    precio: [, [ Validators.required ] ],
  })

  editProducto(){

    const data: Producto = {
      "nombreProducto": this.formCreate.value.nombreProducto,
      "descripcion": this.formCreate.value.descripcion,
      "precio": this.formCreate.value.precio
    }

    this.productoService.editProducto(data, this.id).subscribe({

      next: producto => {

        this.router.navigateByUrl('dashboard/dueno/listProductos');
        Swal.fire('Producto Actualizado', `Producto ${this.producto.nombreProducto} actualizado con éxtio!`, 'success')
      }, error: err => {

        this.errores=err.error.errors as string[];
        console.error(err.error.errors)
      }
    })

  }

}
