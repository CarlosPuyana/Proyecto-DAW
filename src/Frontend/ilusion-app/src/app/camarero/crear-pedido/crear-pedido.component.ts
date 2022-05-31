import { Component, OnInit } from '@angular/core';
import { Pedido } from '../pedido';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Mesa, MesaResponse } from '../../interfaces/mesa.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MesaService } from '../../dueno/services/mesa.service';
import Swal from 'sweetalert2';
import { ProductoService } from '../../dueno/services/producto.service';
import { ItemPedido } from '../itemPedido';
import { ProductoClass } from '../producto';

@Component({
  selector: 'app-crear-pedido',
  templateUrl: './crear-pedido.component.html',
  styleUrls: ['./crear-pedido.component.css']
})
export class CrearPedidoComponent implements OnInit {

  nuevoPedido: Pedido = new Pedido();
  mesas!: MesaResponse[];
  productos: ProductoClass[] = [];
  productoSelected: ProductoClass = new ProductoClass();
  nuevoItem: ItemPedido = new ItemPedido();

  jwt: JwtHelperService = new JwtHelperService();
  optionDefault: string = "Seleccione una mesa";
  optionDefault2: string = "Seleccione un producto";



  constructor(private formBuilder: FormBuilder,private productoService: ProductoService, private mesaService: MesaService) { }

  ngOnInit(): void {

    this.getMesas();
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

  /**
   * Te muestra las mesas
   */
  getMesas() {
    let id = this.findIdUser();

    this.mesaService.findMesasByRestaurante(id).subscribe({
      next: (resp => {

        this.mesas = resp;
      }), error: (err => {
        Swal.fire('Error', err.error.mensaje, 'error');
      })
    })
  }

  /**
   * Construye el formulario con sus campos y validaciones
   */
   formCreate: FormGroup = this.formBuilder.group({

    mesa: [, [ Validators.required]],
    descripcion: [, [ Validators.required]],
    producto: [, [ Validators.required] ]
  })

  registerPedido(): void {

    console.log(this.formCreate.value.mesa);


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

  seleccionarProducto(event: any): void {

    let producto = event.target.value;

    this.productoService.findProductByNombre(producto).subscribe({
      next: resp => {
        this.productoSelected = resp;
        console.log(this.productoSelected);

        let nuevoItem = new ItemPedido();
        nuevoItem.producto = resp;

      this.nuevoPedido.items.push(nuevoItem)

    console.log(this.nuevoPedido.items);
      }
    })


    //this.productoSelected = producto;







  }

}
