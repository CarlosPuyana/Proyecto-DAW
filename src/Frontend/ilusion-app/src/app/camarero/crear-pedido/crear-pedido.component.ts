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
import { PedidoService } from '../services/pedido.service';
import { Router } from '@angular/router';

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
  mesa!: MesaResponse;

  jwt: JwtHelperService = new JwtHelperService();
  optionDefault: string = "Seleccione una mesa";
  optionDefault2: string = "Seleccione un producto";



  constructor(private router: Router , private formBuilder: FormBuilder,private productoService: ProductoService, private mesaService: MesaService, private pedidoService: PedidoService) { }

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

  /**
   * I'm trying to get the value of the formCreate.mesa and then assign it to the nuevoPedido.mesa
   */
  registerPedido(): void {

    this.mesaService.getMesa(this.formCreate.value.mesa).subscribe({
      next: resp => {
        this.mesa = resp;

        this.nuevoPedido.mesa = this.mesa;
        this.nuevoPedido.descripcion = this.formCreate.value.descripcion;

        this.pedidoService.create(this.nuevoPedido).subscribe(pedido => {
          this.router.navigateByUrl("/dashboard/camarero/listPedido");
          Swal.fire('Creado', 'Nueva factura creada con éxito', 'success')
        });

        this.mesa.activo = false;

        this.mesaService.editMesa(this.mesa, this.mesa.mesaId).subscribe({
          next: resp => {
            this.mesa = resp
            console.log(this.mesa);

          }
        })

      }
    })




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

        if (this.existeItem(resp.nombreProducto)) {
          this.incremenntarCantidad(resp.nombreProducto);
        } else {



        let nuevoItem = new ItemPedido();
        nuevoItem.producto = resp;

      this.nuevoPedido.items.push(nuevoItem)
    }

    console.log(this.nuevoPedido.items);
      }
    })
  }

  actualizarCantidad(nombreProducto: string, event: any): void {

    let cantidad: number = event.target.value as number;

    if (cantidad == 0) {

      return this.eliminarItemFactura(nombreProducto);
    }

    console.log(cantidad);

    this.nuevoPedido.items = this.nuevoPedido.items.map((item: ItemPedido) => {
      if (nombreProducto === item.producto.nombreProducto) {
        item.cantidad = cantidad;
      }

      return item;
    });

  }

  existeItem(nombreProducto: string): boolean {

    let existe = false;
    this.nuevoPedido.items.forEach((item: ItemPedido) => {
      if (nombreProducto === item.producto.nombreProducto) {
        existe = true;
      }
    });

    return existe;
  }

  incremenntarCantidad(nombreProducto: string): void {

    this.nuevoPedido.items = this.nuevoPedido.items.map((item: ItemPedido) => {
      if (nombreProducto === item.producto.nombreProducto) {
        ++item.cantidad;
      }

      return item;
    });
  }

  eliminarItemFactura(nombre: string): void {
    this.nuevoPedido.items = this.nuevoPedido.items.filter((item: ItemPedido) => nombre !== item.producto.nombreProducto)
  }



}
