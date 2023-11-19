import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { AuthenticationService } from 'src/app/login/services/authentication.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-relatorio-clientes',
  templateUrl: './relatorio-clientes.component.html',
  styleUrls: ['./relatorio-clientes.component.css']
})
export class RelatorioClientesComponent implements OnInit {

  clientes: User[] = []

  constructor(private userService: AuthenticationService, private router : Router){}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsersByProfile('user').subscribe(
      (users) => {
        this.clientes = users;
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
    documento.text('Relatório de Clientes da Lavanderia', 10, yOffset);
    yOffset += 10;

    this.clientes.forEach((cliente) => {
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
      yOffset += 15; // Espaço entre os detalhes do cliente
    });

    // Gerar o PDF no novo separador do navegador
    //documento.output('dataurlnewwindow');

    documento.save('relatorio-clientes.pdf');


  }

  goBack(){
    this.router.navigate(['/admin_homepage']);
  }
}
