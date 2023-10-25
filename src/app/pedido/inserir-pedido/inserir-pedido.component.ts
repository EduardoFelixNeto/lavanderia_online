import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/shared/models/item.model';
import { ItemService } from 'src/app/item/services/item.service';
import { LinhaPedido } from 'src/app/shared/models/linha-pedido.model';
import { PedidoService } from '../services/pedido.service';
import { Pedido } from 'src/app/shared/models/pedido.model';
import { AuthenticationService } from 'src/app/login/services/authentication.service';
import { User } from 'src/app/shared/models/user.model';
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
  currentUser: User | null;

  constructor(private itemService: ItemService, private router: Router,
    private pedidoService: PedidoService, private authService: AuthenticationService, private modalService: NgbModal) {
    this.currentUser = this.authService.getCurrentUser();
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
    // Pega o último ID da linha de pedido do backend
    this.pedidoService.getLastTransactionLineId().subscribe(lastLineId => {
      const newLineId = lastLineId + 1;
      const userId = this.currentUser!.id;
      const linha = new LinhaPedido(0, userId!, item.id!, quantidade);  // Pedido ID será definido depois
      // Defina o ID da linha de pedido
      linha.id = newLineId;
      linha.totalAmount = item.amount! * quantidade;
      linha.term = item.term!;
      this.linhasPedido.push(linha);
    });
  }



  removerLinhaPedido(index: number) {
    // Apenas remova da lista em memória
    this.linhasPedido.splice(index, 1);
  }


  finalizarPedido(): void {
    if (this.currentUser && this.currentUser.id) {
      this.pedidoService.getLastPedidoId().subscribe(lastId => {
        const newPedidoId = lastId + 1;
        const userId = this.currentUser!.id;
        const totalAmount = this.linhasPedido.reduce((acc, linha) => acc + linha.totalAmount, 0);
        const maxTerm = Math.max(...this.linhasPedido.map(linha => linha.term || 0));

        const newPedido: Pedido = {
          id: newPedidoId,
          userId: userId,
          status: "Em Aberto",
          term: maxTerm,
          amount: totalAmount,
          isPaid: false
        };

        // Primeiro, insira o pedido
        this.pedidoService.createTransaction(newPedido).subscribe(() => {

          // Depois que o pedido é inserido com sucesso, comece a inserir as linhas
          this.linhasPedido.forEach(linha => {
            linha.transactionId = newPedidoId;  // Defina o ID do pedido para cada linha
            this.pedidoService.createTransactionLine(linha).subscribe();
          });

          this.router.navigate(['/user_homepage']);
        });
      });
    }
  }

  abrirModalPedido(): void {
    this.pedidoService.getLastPedidoId().subscribe(lastId => {
      const newPedidoId = lastId + 1;
      const userId = this.currentUser!.id;
      const totalAmount = this.linhasPedido.reduce((acc, linha) => acc + linha.totalAmount, 0);
      const maxTerm = Math.max(...this.linhasPedido.map(linha => linha.term || 0));

      const newPedido: Pedido = {
        id: newPedidoId,
        userId: userId,
        status: "Em Aberto",
        term: maxTerm,
        amount: totalAmount,
        isPaid: false
      };
      const modalRef = this.modalService.open(ModalPedidoComponent);
      modalRef.componentInstance.pedido = newPedido;
    });
  }

  cancelarPedido(): void {
    if (this.currentUser && this.currentUser.id) {
      this.pedidoService.getLastPedidoId().subscribe(lastId => {
        const newPedidoId = lastId + 1;
        const userId = this.currentUser!.id;
        const totalAmount = this.linhasPedido.reduce((acc, linha) => acc + linha.totalAmount, 0);
        const maxTerm = Math.max(...this.linhasPedido.map(linha => linha.term || 0));
        const newPedido: Pedido = {
          id: newPedidoId,
          userId: userId,
          status: "Rejeitado",
          term: maxTerm,
          amount: totalAmount,
          isPaid: false
        };
        this.pedidoService.createTransaction(newPedido).subscribe(() => {
          this.router.navigate(['/user_homepage']);
        });
      });
    }
  }
  backToHome(): void {
    this.router.navigate(['/user_homepage']);
  }
}
