import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/login/services/authentication.service';
import { ModalConsultarPedidoComponent } from 'src/app/pedido/modal-consultar-pedido/modal-consultar-pedido.component';
import { PedidoService } from 'src/app/pedido/services/pedido.service';
import { Pedido } from 'src/app/shared/models/pedido.model';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  currentUser: User | null | undefined;
  pedidos: Pedido[] = [];

  constructor(private router: Router,private authService: AuthenticationService, private pedidoService: PedidoService
    , private modalService: NgbModal){
      this.currentUser = this.authService.getCurrentUser();
    }

  goToPedidosPage(): void {
    this.router.navigate(['/pedidos_page']); // 3. Use o método navigate
  }

  returnLoginPage(): void {
    this.router.navigate(['/login']); // 3. Use o método navigate
  }

  removeUser() {
    if (this.currentUser && this.currentUser.id) { // Certifique-se de que currentUser e currentUser.id estão definidos
      if (confirm("Você tem certeza de que deseja excluir sua conta?")) {
        this.authService.deleteUser(this.currentUser.id).subscribe(() => {
          alert('Conta excluída com sucesso!');
          this.returnLoginPage(); // Redirecionar para a página de login após a exclusão
        }, error => {
          alert('Erro ao excluir conta. Por favor, tente novamente.');
        });
      }
    } else {
      alert('Erro ao obter informações do usuário.');
    }
  }

  ngOnInit(): void {
    if (this.currentUser && this.currentUser.id && this,this.currentUser?.profile == 'admin') {
      this.pedidoService.listAllbyStatus(encodeURIComponent("Em Aberto")).subscribe(data => {
        this.pedidos = data;
      }, error => {
        // Você pode adicionar tratamento de erro aqui
        console.error('Erro ao buscar pedidos', error);
      });
    } else {
      // Lidar com erro - usuário não logado
      console.warn('Usuário não está logado');
    }
  }

  mudarStatusRecolhido(pedidoId: number | undefined): void {
    if (typeof pedidoId === 'undefined') {
      // Lidar com o erro ou retornar
      console.error('ID do pedido não fornecido.');
      return;
    }

    // Encontra o pedido pelo ID
    const pedido = this.pedidos.find(p => p.id === pedidoId);
    if (!pedido) {
      console.error('Pedido não encontrado!');
      return;
    }

    // Atualiza o status do pedido para "Cancelado" (ou outro status apropriado)
    pedido.status = 'Recolhido';

    // Envia a atualização para o servidor
    this.pedidoService.updatePedido(pedido).subscribe({
      next: (updatedPedido) => {
        console.log('Status do pedido modificado para recolhido com sucesso:', updatedPedido);
        // Atualiza a lista de pedidos com as informações mais recentes
        this.ngOnInit();
      },
      error: (err) => {
        console.error('Erro ao mudar o status do pedido:', err);
      }
    });
  }

  abrirModalPedido(pedido: Pedido) {
    const modalRef = this.modalService.open(ModalConsultarPedidoComponent);
    modalRef.componentInstance.pedido = pedido;
  }
}
