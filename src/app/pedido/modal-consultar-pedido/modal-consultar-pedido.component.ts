import { Component, Input } from '@angular/core';
import { Pedido } from 'src/app/shared/models/pedido.model';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LinhaPedido } from 'src/app/shared/models/linha-pedido.model';
import { PedidoService } from '../services/pedido.service';

@Component({
  selector: 'app-modal-consultar-pedido',
  templateUrl: './modal-consultar-pedido.component.html',
  styleUrls: ['./modal-consultar-pedido.component.css']
})
export class ModalConsultarPedidoComponent {
  @Input() pedido!: Pedido;
  linhasPedido: LinhaPedido[] = [];

  constructor(public activeModal: NgbActiveModal, private pedidoService: PedidoService) { }

  ngOnInit(): void {
    if (this.pedido && this.pedido.id) {
      this.pedidoService.listByPedidoId(this.pedido.id).subscribe(data => {
        this.linhasPedido = Array.isArray(data) ? data : [data];
      });
    } else {
      // Lidar com erro - usuário não logado
    }
  }




}
