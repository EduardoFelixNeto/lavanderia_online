import { Component, Input } from '@angular/core';
import { Pedido } from 'src/app/shared/models/pedido.model';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-pedido',
  templateUrl: './modal-pedido.component.html',
  styleUrls: ['./modal-pedido.component.css']
})
export class ModalPedidoComponent {

  @Input() pedido!: Pedido;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void{
  }

}
