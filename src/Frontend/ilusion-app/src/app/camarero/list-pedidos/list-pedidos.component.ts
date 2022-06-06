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

@Component({
  selector: 'app-list-pedidos',
  templateUrl: './list-pedidos.component.html',
  styleUrls: ['./list-pedidos.component.css'],
})
export class ListPedidosComponent implements OnInit {
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
    this.findPedidosActivos();

    this.items = [
      {
        label: 'Ver',
        icon: 'pi pi-fw pi-check',
        command: () => this.verPedido(),
      },
      {
        label: 'Crear pedido',
        icon: 'pi pi-fw pi-plus',
        command: () => this.crearPedido(),
      },
      {
        label: 'Completar pedido',
        icon: 'pi pi-ticket',
        command: () => this.completarPedido()
      },
      {
        label: 'Editar pedido',
        icon: 'pi pi-ticket',
        command: () => this.editarPedido()
      }
    ];

  this.items2 = [
    {
      label: 'Pedidos completados',
      icon: 'pi pi-ticket',
      command: () => this.pedidosCompletados()
    }
  ]
  }

  /**
   * It navigates to the URL 'dashboard/camarero/listPedido/completados'
   */
  pedidosCompletados() {

    this.router.navigateByUrl(
      'dashboard/camarero/listPedido/completados'
    );
  }

  editarPedido() {

    if (this.selectedPedido) {
      this.router.navigateByUrl(
        'dashboard/camarero/editPedido/' + this.selectedPedido.id
      );
    }


  }

  /* A function that is called when the user clicks on the button "Completar pedido" in the table of
  the component. */
  completarPedido() {

    if (this.selectedPedido) {

      Swal.fire({
        title: 'Completar pedido',
        text: `El total del pedido es de  ${this.selectedPedido?.total} € en total. ¿Deseas completar el pedido?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, completar pedido!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Pedido completado!',
            'El pedido ha sido completado.',
            'success'
          )

          this.pedidoService.getPedidoById(this.selectedPedido!.id).subscribe({
            next: resp => {

              resp.activo = false;

              this.pedidoService.editarPedido(resp.id, resp).subscribe({
                next: resp => {

                }
              })

              this.mesaService.getMesa(resp.mesa.mesaId!).subscribe({
                next: resp => {

                  resp.activo = true;

                  this.mesaService.editMesa(resp, resp.mesaId).subscribe({
                    next: resp => {

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

    this.router.navigateByUrl(
      'dashboard/camarero/listPedido'
    );
  }

  crearPedido() {
    this.router.navigateByUrl(
      'dashboard/camarero/crearPedido'
    );
  }

  verPedido() {
    if (this.selectedPedido) {
      this.router.navigateByUrl(
        'dashboard/camarero/verDetalle/' + this.selectedPedido?.id
      );
    }
  }

  findIdUser() {
    return this.jwt.decodeToken(localStorage.getItem('token')!).id;
  }

  findPedidosActivos() {
    this.empleadoService.findRestaurante(this.findIdUser()).subscribe({
      next: (resp) => {
        this.pedidoService.findPedidosByRestauranteActivos(resp.id).subscribe({
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
