import { Component, OnInit } from '@angular/core';
import { EmpleadoResponse } from '../../interfaces/empleado.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpleadoService } from '../services/empleado.service';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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

  constructor(private serviceEmpleado: EmpleadoService,
    private primengConfig: PrimeNGConfig, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.findUser();
    this.primengConfig.ripple = true;
  }

  /**
   * Paginacion para la tabla PrimeNG
   * @param id
   * @returns
   */
  findIndexById(id: number): number {

    let index = -1;

    for (let i = 0; i < this.empleados.length; i++ ) {

      if (this.empleados[id].id === id) {
        index = i;
        break;
      }
    }

    return index;

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

  save() {
    this.buildEditForm()
    this.dialogSave = !this.dialogSave;
  }

  buildEditForm() {
    this.formBuilder.group({
      name: [ , [ Validators.required, Validators.maxLength(30), ] ],
      email: [ , [ Validators.required, Validators.email] ],
    })
  }

  showForm() {
    this.buildEditForm()
    this.dialog = !this.dialog;
  }


  notValidField(field: string) {

    if (this.formGroupEdit.get('rol')?.value == "Elige un rol") {
      this.formGroupEdit.controls['rol'].setErrors({
        require: true
      })
    }

    return this.formGroupEdit.controls[field].errors && this.formGroupEdit.controls[field].touched;
  }

  /**
   * Filtro para la tabla PrimeNG
   * @param $event
   * @param stringVal
   * @param dt
   */
  applyFilterGlobal($event: any, stringVal: any, dt: any) {

    dt!.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
  }

  getUser(id: number) {

    this.router.navigate(["./user/", id])
  }

  addUser() {

    this.router.navigateByUrl('/auth/register')
  }

  selectUserToEdit(user:EmpleadoResponse){
    this.showForm();
    this.selected = user;
  }

}
