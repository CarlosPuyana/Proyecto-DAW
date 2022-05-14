export interface Restaurante {

  id?: number;
  nombreRestaurante: string;
  telefono: string;
  ciudad: string;
  codigoPostal: string;
}

export interface RestauranteResponse {

  id: number;
  nombreRestaurante: string;
  telefono: string;
  ciudad: string;
  codigoPostal: string;
}
