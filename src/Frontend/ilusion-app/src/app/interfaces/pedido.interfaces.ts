import { ItemPedido } from "./itemPedido.interface";
import { Mesa } from './mesa.interface';

export interface Pedido {
  id?: number;
  descripcion: string;
  items: ItemPedido[];
  mesa: Mesa;
  total: number;
  createAt: string;
}

export interface PedidoResponse {
  id: number;
  descripcion: string;
  items: ItemPedido[];
  mesa: Mesa;
  total: number;
  createAt: string;
}
