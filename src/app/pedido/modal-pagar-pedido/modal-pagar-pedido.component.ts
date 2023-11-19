import { Component, Input } from '@angular/core';
import { Pedido } from 'src/app/shared/models/pedido.model';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LinhaPedido } from 'src/app/shared/models/linha-pedido.model';
import { PedidoService } from '../services/pedido.service';

@Component({
  selector: 'app-modal-pagar-pedido',
  templateUrl: './modal-pagar-pedido.component.html',
  styleUrls: ['./modal-pagar-pedido.component.css']
})
export class ModalPagarPedidoComponent {
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

  confirmarPagamento(pedidoId: number | undefined): void {
    if (typeof pedidoId === 'undefined') {
      // Lidar com o erro ou retornar
      console.error('ID do pedido não fornecido.');
      return;
    }

    // Encontra o pedido pelo ID
    const pedido = this.pedido;

    // Atualiza o status do pedido para "Cancelado" (ou outro status apropriado)
    pedido.status = 'Pago';
    pedido.isPaid = true;
    pedido.transactionDate = new Date();

    // Envia a atualização para o servidor
    this.pedidoService.updatePedido(pedido).subscribe({
      next: (updatedPedido) => {
        console.log('Pedido Pago com sucesso:', updatedPedido);
        // Atualiza a lista de pedidos com as informações mais recentes
        this.ngOnInit();
      },
      error: (err) => {
        console.error('Erro ao pagar o pedido:', err);
      }
    });
  }
}
