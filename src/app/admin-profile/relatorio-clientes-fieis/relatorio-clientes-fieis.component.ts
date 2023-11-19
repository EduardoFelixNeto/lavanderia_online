import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { combineLatest, map } from 'rxjs';
import { AuthenticationService } from 'src/app/login/services/authentication.service';
import { PedidoService } from 'src/app/pedido/services/pedido.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-relatorio-clientes-fieis',
  templateUrl: './relatorio-clientes-fieis.component.html',
  styleUrls: ['./relatorio-clientes-fieis.component.css']
})
export class RelatorioClientesFieisComponent implements OnInit {
  clientesFieis: Array<User & { totalOrders: number; totalRevenue: number }> = [];

  constructor(
    private userService: AuthenticationService,
    private pedidoService: PedidoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadLoyalCustomers();
  }

  loadLoyalCustomers(): void {
    this.userService.getUsersByProfile('user').subscribe(
      (users) => {
        // Filtre aqui os usuários que são clientes (isso depende do seu modelo de dados)
        const customers = users.filter(user => user.profile === 'user');

        // Para cada usuário, obtenha os pedidos e calcule os totais
        const customersWithTotals = customers.map(customer => {
          return this.pedidoService.listByUserId(customer.id!).pipe(
            map(pedidos => {
              const totalOrders = pedidos.length;
              const totalRevenue = pedidos.reduce((sum, pedido) => sum + pedido.amount!, 0);
              return { ...customer, totalOrders, totalRevenue };
            })
          );
        });

        // Combine todos os Observables em um único Observable
        combineLatest(customersWithTotals).subscribe(customerTotals => {
          // Aqui você tem a lista de clientes com a quantidade de pedidos e receita total
          // Agora você pode ordenar e pegar os três principais
          this.clientesFieis = customerTotals
            .sort((a, b) => b.totalRevenue - a.totalRevenue) // Ordenar por receita total
            .slice(0, 3); // Pegar os três principais
        });
      },
      (error) => {
        console.error('Erro ao buscar clientes', error);
      }
    );
  }

  gerarPDF(): void {
    const documento = new jsPDF();
    let yOffset = 10;

    documento.setFontSize(12);
    documento.text('Relatório de Clientes Fiéis da Lavanderia', 10, yOffset);
    yOffset += 10;

    this.clientesFieis.forEach((cliente) => {
      documento.setFontSize(10);
      documento.text(`Nome: ${cliente.name}`, 10, yOffset);
      yOffset += 10;
      documento.text(`CPF: ${cliente.cpf}`, 10, yOffset);
      yOffset += 10;
      documento.text(`E-mail: ${cliente.email}`, 10, yOffset);
      yOffset += 10;
      documento.text(`Endereço: ${cliente.address}`, 10, yOffset);
      yOffset += 10;
      documento.text(`Telefone: ${cliente.phone}`, 10, yOffset);
      yOffset += 15;
      documento.text(`Endereço: ${cliente.totalOrders}`, 10, yOffset);
      yOffset += 5;
      documento.text(`Telefone: ${cliente.totalRevenue}`, 10, yOffset);
      yOffset += 10; // Espaço entre os detalhes do cliente// Espaço entre os detalhes do cliente
    });

    // Gerar o PDF no novo separador do navegador
    //documento.output('dataurlnewwindow');

    documento.save('relatorio-clientes.pdf');


  }

  goBack(){
    this.router.navigate(['/admin_homepage']);
  }
}
