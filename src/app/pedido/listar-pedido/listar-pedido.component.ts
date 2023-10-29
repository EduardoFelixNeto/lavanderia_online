import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../services/pedido.service';
import { Pedido } from 'src/app/shared/models/pedido.model';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/login/services/authentication.service'; // Atualize o caminho
import { User } from 'src/app/shared/models/user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConsultarPedidoComponent } from '../modal-consultar-pedido/modal-consultar-pedido.component';
import { ModalPagarPedidoComponent } from '../modal-pagar-pedido/modal-pagar-pedido.component';


@Component({
  selector: 'app-listar-pedido',
  templateUrl: './listar-pedido.component.html',
  styleUrls: ['./listar-pedido.component.css']
})
export class ListarPedidoComponent implements OnInit {

  pedidos: Pedido[] = [];
  originalPedidos: Pedido[] = [];

  currentUser: User | null;

  constructor(private pedidoService: PedidoService, private router: Router, private authService: AuthenticationService
    , private modalService: NgbModal) {
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser && this.currentUser.id) {
      if (this.currentUser?.profile == 'user') {
        this.pedidoService.listByUserId(this.currentUser.id).subscribe(data => {
          this.originalPedidos = Array.isArray(data) ? data : [data];
          this.pedidos = [...this.originalPedidos];  // Clone a lista original
        });
      } else if (this.currentUser?.profile == 'admin') {
        this.pedidoService.listAll().subscribe(data => {
          this.pedidos = data;
        }, error => {
          // Você pode adicionar tratamento de erro aqui
          console.error('Erro ao buscar pedidos', error);
        });
      } else {
        // Lidar com erro - usuário não logado
      }
    }
  }

  returnHomePage(): void {
    if(this.currentUser!.profile == 'user'){
    this.router.navigate(['/user_homepage']);
    } else if (this.currentUser!.profile == 'admin'){
      this.router.navigate(['/admin_homepage']);
    }
  }

  novoPedido(): void {
    this.router.navigate(['/novo_pedido_page']); // 3. Use o método navigate
  }

  pagarPedido(pedido: Pedido) {
    const modalRef = this.modalService.open(ModalPagarPedidoComponent);
    modalRef.componentInstance.pedido = pedido;
  }

  activeFilters = {
    id: null as number | null,
    status: null as string | null,
    pago: false
  };

  applyFilters(): void {
    this.pedidos = this.originalPedidos;

    if (this.activeFilters.id) {
      this.pedidos = this.pedidos.filter(pedido => pedido.id === this.activeFilters.id);
    }

    if (this.activeFilters.status) {
      this.pedidos = this.pedidos.filter(pedido => pedido.status === this.activeFilters.status);
    }
  }

  onSubmitID(buscaPorId: number): void {
    this.activeFilters.id = buscaPorId;
    this.applyFilters();
  }

  onSubmitStatus(buscarPorStatus: string): void {
    this.activeFilters.status = buscarPorStatus;
    this.applyFilters();
  }

  toggleFilter(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.activeFilters.pago = inputElement.checked;
    this.applyFilters();
  }

  resetFilters(): void {
    this.activeFilters = { id: null, status: null, pago: false };
    this.applyFilters();
  }

  abrirModalPedido(pedido: Pedido) {
    const modalRef = this.modalService.open(ModalConsultarPedidoComponent);
    modalRef.componentInstance.pedido = pedido;
  }

  cancelarPedido(pedidoId: number | undefined): void {
    if (typeof pedidoId === 'undefined') {
      // Lidar com o erro ou retornar
      console.error('ID do pedido não fornecido.');
      return;
    }

    // Encontra o pedido pelo ID
    const pedido = this.originalPedidos.find(p => p.id === pedidoId);
    if (!pedido) {
      console.error('Pedido não encontrado!');
      return;
    }

    // Atualiza o status do pedido para "Cancelado" (ou outro status apropriado)
    pedido.status = 'Rejeitado';

    // Envia a atualização para o servidor
    this.pedidoService.updatePedido(pedido).subscribe({
      next: (updatedPedido) => {
        console.log('Pedido cancelado com sucesso:', updatedPedido);
        // Atualiza a lista de pedidos com as informações mais recentes
        this.ngOnInit();
      },
      error: (err) => {
        console.error('Erro ao cancelar o pedido:', err);
      }
    });
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

  mudarStatusAguardandoPagamento(pedidoId: number | undefined): void {
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
    pedido.status = 'Aguardando Pagamento';

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

  mudarStatusFinalizado(pedidoId: number | undefined): void {
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
    pedido.status = 'Finalizado';

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

}