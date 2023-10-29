import { Component, Input } from '@angular/core';
import { Pedido } from 'src/app/shared/models/pedido.model';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-consultar-pedido',
  templateUrl: './modal-consultar-pedido.component.html',
  styleUrls: ['./modal-consultar-pedido.component.css']
})
export class ModalConsultarPedidoComponent {
  @Input() pedido!: Pedido;

  constructor(public activeModal: NgbActiveModal) { }
  ngOnInit(): void {
  }

}
