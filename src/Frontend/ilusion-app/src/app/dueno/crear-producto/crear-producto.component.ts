import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Producto } from '../../interfaces/producto.interface';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private productoService: ProductoService) { }

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



  }

}
