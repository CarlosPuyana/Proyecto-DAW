import { Component, OnInit } from '@angular/core';
import { MesaResponse } from '../../interfaces/mesa.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MesaService } from '../services/mesa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-mesa',
  templateUrl: './edit-mesa.component.html',
  styleUrls: ['./edit-mesa.component.css']
})
export class EditMesaComponent implements OnInit {

  mesa!: MesaResponse;
  jwt: JwtHelperService = new JwtHelperService();
  errores: string[] = [];
  id!: number;

  constructor(private formBuilder: FormBuilder,  private activatedRoute: ActivatedRoute, private router: Router, private mesaService: MesaService ) { }

  ngOnInit(): void {

    this.cargarMesa();
  }

  /**
   * Carga la mesa a editar
   */
  cargarMesa() {

    this.activatedRoute.params.subscribe(params => {
      this.id= params['id']
      if (this.id) {
        this.mesaService.getMesa(this.id).subscribe((mesa) => this.mesa = mesa )
      }
    })
  }

  /**
   * Construye el formulario con sus campos y validaciones
   */
   formCreate: FormGroup = this.formBuilder.group({
    nombreMesa: [, [ Validators.required] ],
    capacidad: [, [ Validators.required] ]
  })

  editMesa() {

    const data = {

      "nombreMesa": this.formCreate.value.nombreMesa,
      "capacidad": this.formCreate.value.capacidad
    }

    this.mesaService.editMesa(data, this.id).subscribe({
      next: mesa => {

        this.router.navigateByUrl('dashboard/dueno/listMesa')
        Swal.fire('Mesa Actualizado', `Mesa ${this.mesa.nombreMesa} actualizado con éxtio!`, 'success')

      }, error: err => {

        this.errores=err.error.errors as string[];
        console.error(err.error.errors)
      }
    })

  }


}
