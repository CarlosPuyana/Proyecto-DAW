import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from '../services/pedido.service';
import { Pedido } from '../pedido';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductoService } from '../../dueno/services/producto.service';
import { MesaResponse } from '../../interfaces/mesa.interface';
import { ProductoClass } from '../producto';
import { ItemPedido } from '../itemPedido';
import { JwtHelperService } from '@auth0/angular-jwt';
import Swal from 'sweetalert2';
import { MesaService } from '../../dueno/services/mesa.service';

@Component({
  selector: 'app-edit-pedido',
  templateUrl: './edit-pedido.component.html',
  styleUrls: ['./edit-pedido.component.css']
})
export class EditPedidoComponent implements OnInit {

  pedido!: Pedido;

  mesas!: MesaResponse[];
  productos: ProductoClass[] = [];
  productoSelected: ProductoClass = new ProductoClass();
  nuevoItem: ItemPedido = new ItemPedido();
  mesa!: MesaResponse;
  idPedido!: number;

  nuevoPedido: Pedido = new Pedido();
  optionDefault2: string = "Seleccione un producto";

  jwt: JwtHelperService = new JwtHelperService();

  constructor(private router: Router ,private mesaService: MesaService ,private productoService: ProductoService, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private pedidoService: PedidoService) { }

  ngOnInit(): void {

    this.cargarPedido();
    this.findProductos();
  }

  cargarPedido() {
      this.activatedRoute.params.subscribe(params => {
        this.idPedido = params['id']
        if (this.idPedido) {
          this.pedidoService.findPedido(this.idPedido).subscribe({
            next: resp => {
              this.pedido = resp;
              console.log(this.pedido);
              console.log(this.pedido.items[0].producto.nombreProducto);


            }
          } )
        }
      })
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


  /**
   * Construye el formulario con sus campos y validaciones
   */
   formCreate: FormGroup = this.formBuilder.group({

    mesa: [, [ Validators.required]],
    descripcion: [, [ Validators.required]],
    producto: [, [ Validators.required] ]
  })

  seleccionarProducto(event: any): void {

    let producto = event.target.value;

    console.log("as");

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

    console.log(this.pedido.items);
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


  registerPedido(): void {

        this.nuevoPedido.mesa = this.pedido.mesa;
        this.nuevoPedido.descripcion = this.formCreate.value.descripcion;

    console.log(this.pedido.items.length);


        for (let i = 0; i < this.pedido.items.length; i++) {

          this.nuevoPedido.items.push(this.pedido.items[i]);
        }



      console.log(this.nuevoPedido);


        this.pedidoService.updatePedido(this.nuevoPedido, this.idPedido).subscribe({
          next: resp => {

            this.router.navigateByUrl("/dashboard/camarero/listPedido");
          Swal.fire('Creado', 'Nueva factura creada con éxito', 'success')
          }
        })

        this.mesa.activo = false;

        this.mesaService.editMesa(this.mesa, this.mesa.mesaId).subscribe({
          next: resp => {
            this.mesa = resp
            console.log(this.mesa);

          }
        })
      }


}
