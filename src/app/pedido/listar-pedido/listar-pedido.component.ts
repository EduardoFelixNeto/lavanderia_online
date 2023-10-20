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
export class ListarPedidoComponent implements OnInit{
  
  pedidos: Pedido[] = [];

  currentUser: User | null;

  constructor(private pedidoService: PedidoService, private router: Router, private authService: AuthenticationService) {
    this.currentUser = this.authService.getCurrentUser();
   }
  
  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (this.currentUser && this.currentUser.id) {
    if (currentUser) {
        this.pedidoService.listByUserId(this.currentUser.id).subscribe(data => {
            this.pedidos = data;
        });
    } else {
        // Lidar com erro - usuário não logado
    }
  }
}
  returnLoginPage(): void {
    this.router.navigate(['/user_homepage']); // 3. Use o método navigate
  }

  novoPedido(): void{
    this.router.navigate(['/novo_pedido_page']); // 3. Use o método navigate
  }

  verPedido(){
    
  }
}