export interface Empleado {

  id?: number;
  userName: string;
  nombre: string;
  email: string;
  apellidos: string;
  role: string;
  password?: string;

}

export interface EmpleadoResponse {
  id: number;
  userName: string;
  nombre: string;
  email: string;
  apellidos: string;
  role: string;
}
