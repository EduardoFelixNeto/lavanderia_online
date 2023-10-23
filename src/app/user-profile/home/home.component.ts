import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/login/services/authentication.service';
import { Customer } from 'src/app/shared/models/customer.model';
import { PedidoService } from 'src/app/pedido/services/pedido.service';
import { Pedido } from 'src/app/shared/models/pedido.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  currentCustomer: Customer | null;
  pedidos: Pedido[] = [];

  constructor(private router: Router, private authService: AuthenticationService, private pedidoService: PedidoService) {
    this.currentCustomer = this.authService.getCurrentCustomer(); // Obtenha o currentCustomer ao inicializar o componente
  }

  goToPedidosPage(): void {
    this.router.navigate(['/pedidos_page']); // 3. Use o método navigate
  }

  returnLoginPage(): void {
    this.router.navigate(['/login']); // 3. Use o método navigate
  }

  removeCustomer() {
    if (this.currentCustomer && this.currentCustomer.id) { // Certifique-se de que currentCustomer e currentCustomer.id estão definidos
      if (confirm("Você tem certeza de que deseja excluir sua conta?")) {
        this.authService.deleteCustomer(this.currentCustomer.id).subscribe(() => {
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
    if (this.currentCustomer && this.currentCustomer.id) {
      this.pedidoService.listByCustomerIdAndStatus(this.currentCustomer.id,encodeURIComponent("Em Aberto")).subscribe(data => {
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

  novoPedido(): void {
    this.router.navigate(['/novo_pedido_page']); // 3. Use o método navigate
  }

  pagarPedido(): void {
  }

}
