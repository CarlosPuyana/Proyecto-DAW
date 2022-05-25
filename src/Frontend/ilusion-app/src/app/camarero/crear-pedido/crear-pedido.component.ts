import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/interfaces/pedido.interfaces';
import { PedidoResponse } from '../../interfaces/pedido.interfaces';

@Component({
  selector: 'app-crear-pedido',
  templateUrl: './crear-pedido.component.html',
  styleUrls: ['./crear-pedido.component.css']
})
export class CrearPedidoComponent implements OnInit {

  nuevoPedido!: PedidoResponse;

  constructor() { }

  ngOnInit(): void {
  }

}
