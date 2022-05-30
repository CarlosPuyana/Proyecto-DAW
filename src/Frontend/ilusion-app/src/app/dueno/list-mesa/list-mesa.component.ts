import { Component, OnInit } from '@angular/core';
import { MesaResponse } from '../../interfaces/mesa.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { MesaService } from '../services/mesa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-mesa',
  templateUrl: './list-mesa.component.html',
  styleUrls: ['./list-mesa.component.css']
})
export class ListMesaComponent implements OnInit {

  mesas!: MesaResponse[];
  mesa!: MesaResponse;
  jwt: JwtHelperService = new JwtHelperService();

  cols: any[] = [];
  items: MenuItem[] = [];
  selectedMesa?: MesaResponse;

  constructor(private router: Router, private mesaService: MesaService) { }

  ngOnInit(): void {

    this.findMesas();

    this.items = [
      {
        label: "Nuevo",
        icon: 'pi pi-fw pi-user-plus',
        command: () => this.crearEditarMesa(false)
      },
      {
        label: 'Editar',
        icon: 'pi pi-fw pi-user-edit',
        command: () => this.crearEditarMesa(true)
      },
      {
        label: "Eliminar",
        icon: "pi pi-trash"
      }
    ]
  }


  /**
   * Te lleva a editar o crear mesa segun donde clickes
   * @param editar
   * @returns
   */
  crearEditarMesa(editar: boolean): void {

    if (editar) {

      if (this.selectedMesa?.mesaId != null) {

        this.router.navigateByUrl('dashboard/dueno/editarMesa/' + this.selectedMesa?.mesaId)
      } else {

        return;
      }
    } else {
      console.log(this.selectedMesa);
      this.router.navigateByUrl('dashboard/dueno/crearMesa')
    }
  }

  /**
   * Obtiene la id del usuario a través del token
   * @returns
   */
   findIdUser(): number {

    let token = localStorage.getItem("token")!;

    return this.jwt.decodeToken(token).id;
  }


  /**
   * Te muestra las mesas
   */
  findMesas() {
    let id = this.findIdUser();

    this.mesaService.findMesasByRestaurante(id).subscribe({
      next: (resp => {

        this.mesas = resp;
      }), error: (err => {
        Swal.fire('Error', err.error.mensaje, 'error');
      })
    })

  }


}
