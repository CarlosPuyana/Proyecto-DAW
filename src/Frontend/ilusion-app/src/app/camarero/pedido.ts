import { Mesa } from "../interfaces/mesa.interface";
import { ItemPedido } from "./itemPedido";

export class Pedido {
  id!: number;
  descripcion!: string;
  items: ItemPedido[] = [];
  mesa!: Mesa;
  total!: number;
  createAt!: string;
}
