import { Mesa } from "../interfaces/mesa.interface";
import { ItemPedido } from './itemPedido';

export class Pedido {
  id!: number;
  descripcion!: string;
  items: ItemPedido[] = [];
  mesa!: Mesa;
  total!: number;
  createAt!: string;


  calcularGranTotal(): number {
    this.total = 0;
    this.items.forEach((item: ItemPedido) => {

      this.total +=  item.calcularImporte();
    });

    return Number(this.total.toFixed(2));
  }

}
