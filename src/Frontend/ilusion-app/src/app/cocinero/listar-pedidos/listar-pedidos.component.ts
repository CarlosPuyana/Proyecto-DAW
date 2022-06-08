import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/interfaces/pedido.interfaces';
import { PedidoResponse } from '../../interfaces/pedido.interfaces';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MenuItem } from 'primeng/api';
import { Route, Router } from '@angular/router';
import { PedidoService } from 'src/app/dueno/services/pedido.service';
import Swal from 'sweetalert2';
import { EmpleadoService } from '../../admin/services/empleado.service';
import { MesaService } from '../../dueno/services/mesa.service';
import { NotiService } from 'src/app/admin/services/noti.service';
import { Notificaciones } from '../../interfaces/noti.interface';

@Component({
  selector: 'app-listar-pedidos',
  templateUrl: './listar-pedidos.component.html',
  styleUrls: ['./listar-pedidos.component.css']
})
export class ListarPedidosComponent implements OnInit {

  pedidos!: Pedido[];
  pedido!: PedidoResponse;
  jwt: JwtHelperService = new JwtHelperService();
  noti!: Notificaciones;

  cols: any[] = [];
  items: MenuItem[] = [];
  items2: MenuItem[] = [];
  selectedPedido?: PedidoResponse;

  constructor(
    private router: Router,
    private pedidoService: PedidoService,
    private empleadoService: EmpleadoService,
    private mesaService: MesaService,
    private notiService: NotiService
  ) {}

  ngOnInit(): void {
    this.findPedidosActivos();

    this.items = [
      {
        label: 'Ver',
        icon: 'pi pi-fw pi-check',
        command: () => this.verPedido(),
      },
      {
        label: 'Realizar',
        icon: 'pi pi-fw pi-check',
        command: () => this.realizarPedido(),
      }
    ];


  }

  realizarPedido() {
    if (this.selectedPedido) {

      Swal.fire({
        title: 'Realizar pedido',
        text: `¿Deseas dar como realizado el pedido ${this.selectedPedido.descripcion}?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, completar pedido!',
        cancelButtonText: 'Cancelar'
      }).then((result) =>{

        if (result.isConfirmed) {
          Swal.fire(
            'Pedido realizado!',
            'El pedido ha sido realizado',
            'success'
          )

          this.pedidoService.getPedidoById(this.selectedPedido!.id).subscribe({
            next: resp => {

              resp.activo = true;
              resp.realizado = true;

              this.pedidoService.editarPedido(resp.id, resp).subscribe({
                next: resp2 => {

                  const data: Notificaciones = {
                    "mensaje": `Pedido ${resp.mesa.nombreMesa} realizado`
                  }

                  this.notiService.crearNoti(data).subscribe({
                    next: resp => {

                      this.notiService.setRestaurant(resp, this.findIdUser()).subscribe({
                        next: resp => {

                        }
                      })

                    }
                  })
                }
              })
            }

          })

        }

      })

      setTimeout(() => {
        window.location.reload()
      }, 2000);

    }
  }

  /**
   * If the selectedPedido is not null, then navigate to the url 'dashboard/cocinero/verDetalle/' + the
   * id of the selectedPedido
   */
  verPedido() {
    if (this.selectedPedido) {
      this.router.navigateByUrl(
        'dashboard/cocinero/verDetalle/' + this.selectedPedido?.id
      );
    }
  }

  findIdUser() {
    return this.jwt.decodeToken(localStorage.getItem('token')!).id;
  }

  findPedidosActivos() {
    this.empleadoService.findRestaurante(this.findIdUser()).subscribe({
      next: (resp) => {
        this.pedidoService.findPedidosByRestaurantePorRealizar(resp.id).subscribe({
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
  }

}
