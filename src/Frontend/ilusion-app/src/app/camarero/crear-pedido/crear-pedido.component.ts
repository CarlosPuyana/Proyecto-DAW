import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/interfaces/pedido.interfaces';
import { PedidoResponse } from '../../interfaces/pedido.interfaces';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-pedido',
  templateUrl: './crear-pedido.component.html',
  styleUrls: ['./crear-pedido.component.css']
})
export class CrearPedidoComponent implements OnInit {

  nuevoPedido!: PedidoResponse;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  /**
   * Construye el formulario con sus campos y validaciones
   */
   formCreate: FormGroup = this.formBuilder.group({

  })

  registerProducto(): void {

  }

}
