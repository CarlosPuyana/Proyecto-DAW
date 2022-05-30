import { Component, OnInit } from '@angular/core';
import { PedidoResponse } from 'src/app/interfaces/pedido.interfaces';
import { PedidoService } from '../../dueno/services/pedido.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.css']
})
export class DetallePedidoComponent implements OnInit {

  pedido!: PedidoResponse;


  constructor(private pedidoService: PedidoService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id')!;
      this.pedidoService.getPedidoById(id).subscribe({
        next: pedido => {
          this.pedido = pedido;
          console.log(this.pedido);

        }
      })
    } )

  }

}
