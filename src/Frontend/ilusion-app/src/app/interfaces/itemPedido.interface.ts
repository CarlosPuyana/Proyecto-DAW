import { Producto } from './producto.interface';
export interface ItemPedido {

  id?: number;
  producto: Producto;
  cantidad: number;
  importe: number;


}
export interface ItemPedidoResponse {

  id: number;
  producto: Producto;
  cantidad: number;
  importe: number;
}


