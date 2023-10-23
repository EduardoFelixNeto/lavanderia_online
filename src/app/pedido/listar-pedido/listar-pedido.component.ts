import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../services/pedido.service';
import { Pedido } from 'src/app/shared/models/pedido.model';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/login/services/authentication.service'; // Atualize o caminho
import { Customer } from 'src/app/shared/models/customer.model';


@Component({
  selector: 'app-listar-pedido',
  templateUrl: './listar-pedido.component.html',
  styleUrls: ['./listar-pedido.component.css']
})
export class ListarPedidoComponent implements OnInit{
  
  pedidos: Pedido[] = [];

  currentCustomer: Customer | null;

  constructor(private pedidoService: PedidoService, private router: Router, private authService: AuthenticationService) {
    this.currentCustomer = this.authService.getCurrentCustomer();
   }
  
  ngOnInit(): void {
    const currentCustomer = this.authService.getCurrentCustomer();
    if (this.currentCustomer && this.currentCustomer.id) {
    if (currentCustomer) {
        this.pedidoService.listByCustomerId(this.currentCustomer.id).subscribe(data => {
            this.pedidos = data;
        });
    } else {
        // Lidar com erro - usuário não logado
    }
  }
}
  returnLoginPage(): void {
    this.router.navigate(['/customer_homepage']); // 3. Use o método navigate
  }

  novoPedido(): void{
    this.router.navigate(['/novo_pedido_page']); // 3. Use o método navigate
  }

  verPedido(){
    
  }
}