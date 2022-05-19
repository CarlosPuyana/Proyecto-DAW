import { Component, OnInit } from '@angular/core';
import { MesaResponse } from '../../interfaces/mesa.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  ngOnInit(): void {

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


}
