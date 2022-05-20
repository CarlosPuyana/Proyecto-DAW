import { Component, OnInit } from '@angular/core';
import { EmpleadoResponse } from '../../interfaces/empleado.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpleadoService } from '../services/empleado.service';
import { ConfirmationService, PrimeNGConfig, MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ProductoResponse } from '../../interfaces/producto.interface';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  empleados!: EmpleadoResponse[];
  empleado!: EmpleadoResponse;
  selected!: EmpleadoResponse;
  dialog!: boolean;
  dialogSave!: boolean;
  formGroupEdit!: FormGroup;
  optionDefaut: string = "Seleccione un rol";
  jwt:JwtHelperService = new JwtHelperService();

  cols: any[] = [];
  items: MenuItem[] = [];
  selectedUser?: ProductoResponse;

  constructor(private serviceEmpleado: EmpleadoService,
    private primengConfig: PrimeNGConfig, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.findUser();

    this.items = [
      {
        label: "Nuevo",
        icon: 'pi pi-fw pi-user-plus',
        command: () => this.crearEditarUser(false)
      },
      {
        label: 'Editar',
        icon: 'pi pi-fw pi-user-edit',
        command: () => this.crearEditarUser(true)
      },
      {
        label: "Eliminar",
        icon: "pi pi-trash"
      }
    ]

  }
  crearEditarUser(editar: boolean): void {

    if (editar) {

      if (this.selectedUser?.id != null) {

        this.router.navigateByUrl('dashboard/admin/editarUser/' + this.selectedUser?.id)
      } else {

        return;
      }

    } else {

      this.router.navigateByUrl('dashboard/admin/createUser')
    }
  }


  /**
   * Obtiene la lista de usuarios
   */
  findUser() {
    this.serviceEmpleado.findUsers().subscribe({
      next: (resp => {
        this.empleados = resp;
      }),
      error: (err => {
        Swal.fire(
          'Error!', err.error.mensaje, 'error'
        );
      })
    })
  }


  notValidField(field: string) {

    if (this.formGroupEdit.get('rol')?.value == "Elige un rol") {
      this.formGroupEdit.controls['rol'].setErrors({
        require: true
      })
    }

    return this.formGroupEdit.controls[field].errors && this.formGroupEdit.controls[field].touched;
  }



  getUser(id: number) {

    this.router.navigate(["./user/", id])
  }


}
