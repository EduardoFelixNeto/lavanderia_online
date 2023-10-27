import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../services/pedido.service';
import { Pedido } from 'src/app/shared/models/pedido.model';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/login/services/authentication.service'; // Atualize o caminho
import { User } from 'src/app/shared/models/user.model';


@Component({
  selector: 'app-listar-pedido',
  templateUrl: './listar-pedido.component.html',
  styleUrls: ['./listar-pedido.component.css']
})
export class ListarPedidoComponent implements OnInit {

  pedidos: Pedido[] = [];
  originalPedidos: Pedido[] = [];

  currentUser: User | null;

  constructor(private pedidoService: PedidoService, private router: Router, private authService: AuthenticationService) {
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser && this.currentUser.id) {
      this.pedidoService.listByUserId(this.currentUser.id).subscribe(data => {
        this.originalPedidos = Array.isArray(data) ? data : [data];
        this.pedidos = [...this.originalPedidos];  // Clone a lista original
      });
    } else {
      // Lidar com erro - usuário não logado
    }
  }

  returnLoginPage(): void {
    this.router.navigate(['/user_homepage']); // 3. Use o método navigate
  }

  novoPedido(): void {
    this.router.navigate(['/novo_pedido_page']); // 3. Use o método navigate
  }

  verPedido() {

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
}