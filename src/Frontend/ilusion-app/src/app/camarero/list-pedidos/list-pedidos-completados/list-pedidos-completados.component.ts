import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/interfaces/pedido.interfaces';
import { PedidoResponse } from '../../../interfaces/pedido.interfaces';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MenuItem } from 'primeng/api';
import { Route, Router } from '@angular/router';
import { PedidoService } from 'src/app/dueno/services/pedido.service';
import Swal from 'sweetalert2';
import { EmpleadoService } from '../../../admin/services/empleado.service';
import { MesaService } from '../../../dueno/services/mesa.service';
@Component({
  selector: 'app-list-pedidos-completados',
  templateUrl: './list-pedidos-completados.component.html',
  styleUrls: ['./list-pedidos-completados.component.css']
})
export class ListPedidosCompletadosComponent implements OnInit {
  pedidos!: Pedido[];
  pedido!: PedidoResponse;
  jwt: JwtHelperService = new JwtHelperService();

  cols: any[] = [];
  items: MenuItem[] = [];
  items2: MenuItem[] = [];
  selectedPedido?: PedidoResponse;

  constructor(
    private router: Router,
    private pedidoService: PedidoService,
    private empleadoService: EmpleadoService,
    private mesaService: MesaService
  ) {}

  ngOnInit(): void {
    this.findPedidosInactivos();

  this.items2 = [
    {
      label: 'Pedidos activos',
      icon: 'pi pi-ticket',
      command: () => this.pedidosActivos()
    }
  ]
  }

  pedidosActivos() {

    this.router.navigateByUrl(
      'dashboard/camarero/listPedido'
    );
  }

  findIdUser() {
    return this.jwt.decodeToken(localStorage.getItem('token')!).id;
  }

  findPedidosInactivos() {
    this.empleadoService.findRestaurante(this.findIdUser()).subscribe({
      next: (resp) => {
        this.pedidoService.findPedidosByRestauranteInactivos(resp.id).subscribe({
          next: (resp) => {
            this.pedidos = resp;
            for(let i = 0; i < 10; i++) {

              this.pedidos[i].total = Number(this.pedidos[i].total.toFixed(2));
            }
          },
          error: (err) => {
            Swal.fire('Error', err.error.mensaje, 'error');
          },
        });
      },
    });

    this.pedidoService.findPedidosByRestaurante(1).subscribe({
      next: (resp) => {
        this.pedidos = resp;
      },
      error: (err) => {
        Swal.fire('Error', err.error.mensaje, 'error');
      },
    });
  }
}
