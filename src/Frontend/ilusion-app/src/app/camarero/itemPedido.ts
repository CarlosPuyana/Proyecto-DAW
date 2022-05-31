import { Producto } from '../interfaces/producto.interface';
export class ItemPedido {

  id!: number;
  producto!: Producto;
  cantidad: number = 1;
  importe!: number;

  public calcularImporte(): number {

    return this.cantidad * this.producto.precio;
  }
}
