import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/shared/models/item.model';
import { ItemService } from 'src/app/item/services/item.service';
import { LinhaPedido } from 'src/app/shared/models/linha-pedido.model';
import { PedidoService } from '../services/pedido.service';
import { Pedido } from 'src/app/shared/models/pedido.model';
import { AuthenticationService } from 'src/app/login/services/authentication.service';
import { Customer } from 'src/app/shared/models/customer.model';
import { ModalPedidoComponent } from '../modal-pedido/modal-pedido.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { last } from 'rxjs';

@Component({
  selector: 'app-inserir-pedido',
  templateUrl: './inserir-pedido.component.html',
  styleUrls: ['./inserir-pedido.component.css']
})
export class InserirPedidoComponent implements OnInit {

  itens: Item[] = [];
  linhasPedido: LinhaPedido[] = [];
  currentCustomer: Customer | null;

  constructor(private itemService: ItemService, private router: Router,
    private pedidoService: PedidoService, private authService: AuthenticationService, private modalService: NgbModal) {
    this.currentCustomer = this.authService.getCurrentCustomer();
  }

  ngOnInit(): void {
    this.itemService.listAll().subscribe(data => {
      this.itens = data;
    });
  }
  returnPedidoPage(): void {
    this.router.navigate(['/pedidos_page']); // 3. Use o método navigate
  }

  incluirItem(item: Item, quantidade: number) {
    console.log(item);
    this.pedidoService.getLastPedidoId().subscribe(lastId => {
      const newPedidoId = lastId + 1;
      const customerId = this.currentCustomer!.id;
      const date = new Date();
      const linha = new LinhaPedido(newPedidoId,customerId!,item.id!,quantidade, date);
      linha.totalAmount = item.amount! * quantidade;
      linha.term = item.term!;
      console.log(item.term);
      console.log(linha.term);
      this.linhasPedido.push(linha);
      console.log(linha);
      this.pedidoService.createTransactionLine(linha).subscribe();
    });
  }

  removerLinhaPedido(id: number,index: number) {
    console.log(id);
    this.pedidoService.deleteTransactionLine(id);
    this.linhasPedido.splice(index, 1);
  }

  finalizarPedido(): void {
    if (this.currentCustomer && this.currentCustomer.id) {
      this.pedidoService.getLastPedidoId().subscribe(lastId => {
        const newPedidoId = lastId + 1;
        const customerId = this.currentCustomer!.id;
        const date = new Date();
        const totalAmount = this.linhasPedido.reduce((acc, linha) => acc + linha.totalAmount, 0);
        const maxTerm = Math.max(...this.linhasPedido.map(linha => linha.term || 0));
        const newPedido: Pedido = {
          id: newPedidoId,
          customerId: customerId,
          status: "Em Aberto",
          term: maxTerm,
          amount: totalAmount,
          isPaid: false,
          createdAt: date
        };
        this.pedidoService.createTransaction(newPedido).subscribe(() => {
          this.router.navigate(['/customer_homepage']);
        });
      });
    }
  }

  abrirModalPedido(): void {
    this.pedidoService.getLastPedidoId().subscribe(lastId => {
      const newPedidoId = lastId + 1;
      const customerId = this.currentCustomer!.id;
      const totalAmount = this.linhasPedido.reduce((acc, linha) => acc + linha.totalAmount, 0);
      const maxTerm = Math.max(...this.linhasPedido.map(linha => linha.term || 0));
      const date = new Date();
      const newPedido: Pedido = {
        id: newPedidoId,
        customerId: customerId,
        status: "Em Aberto",
        term: maxTerm,
        amount: totalAmount,
        isPaid: false,
        createdAt: date
      };
      const modalRef = this.modalService.open(ModalPedidoComponent);
      modalRef.componentInstance.pedido = newPedido;
    });
  }

  cancelarPedido(): void {
    if (this.currentCustomer && this.currentCustomer.id) {
      this.pedidoService.getLastPedidoId().subscribe(lastId => {
        const newPedidoId = lastId + 1;
        const date = new Date();
        const customerId = this.currentCustomer!.id;
        const totalAmount = this.linhasPedido.reduce((acc, linha) => acc + linha.totalAmount, 0);
        const maxTerm = Math.max(...this.linhasPedido.map(linha => linha.term || 0));
        const newPedido: Pedido = {
          id: newPedidoId,
          customerId: customerId,
          status: "Rejeitado",
          term: maxTerm,
          amount: totalAmount,
          isPaid: false,
          createdAt: date
        };
        this.pedidoService.createTransaction(newPedido).subscribe(() => {
          this.router.navigate(['/customer_homepage']);
        });
      });
    }
  }
}
