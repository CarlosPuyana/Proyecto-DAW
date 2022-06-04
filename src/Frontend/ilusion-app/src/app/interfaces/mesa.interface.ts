export interface Mesa {
  mesaId?: number;
  nombreMesa: string;
  capacidad: number;
  activo?: boolean;
}

export interface MesaResponse {
  mesaId: number,
  nombreMesa: string,
  capacidad: number
  activo: boolean;
}
