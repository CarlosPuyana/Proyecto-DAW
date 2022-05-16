export interface Producto {
  id?: number;
  nombreProducto: string;
  descripcion: string;
  precio: number;

}

export interface ProductoResponse {
  id: number;
  nombreProducto: string;
  descripcion: string;
  precio: number;
}
