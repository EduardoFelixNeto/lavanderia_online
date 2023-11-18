import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-relatorio-clientes',
  templateUrl: './relatorio-clientes.component.html',
  styleUrls: ['./relatorio-clientes.component.css']
})
export class RelatorioClientesComponent implements OnInit {

  clientesFicticios = [
    { nome: 'João', cpf: '123456789-06', email: 'joao@gmail.com', endereco: 'Rua A, 123', telefone: '41 99999-9999' },
    { nome: 'Manoel Gomes', cpf: '123456789-91', email: 'manoelcaneta@gmail.com', endereco: 'Rua Caneta azul, 234', telefone: '11 99999-9999' },
    { nome: 'José', cpf: '345678987-10', email: 'jose@gmail.com', endereco: 'Rua dos foguetes, 346', telefone: '44 99999-9999' },
    { nome: 'Joaquina', cpf: '333456789-91', email: 'joaquina@gmail.com', endereco: 'Rua Caneta azul, 234', telefone: '11 99999-9999' },
    { nome: 'Joana', cpf: '444678987-10', email: 'joana@gmail.com', endereco: 'Rua dos POmbos, 456', telefone: '44 99999-9999' }
  ];

  constructor(private router : Router){}

  ngOnInit(): void { }

  gerarPDF(): void {
    const documento = new jsPDF();
    let yOffset = 10;

    documento.setFontSize(12);
    documento.text('Relatório de Clientes da Lavanderia', 10, yOffset);
    yOffset += 10;

    this.clientesFicticios.forEach((cliente) => {
      documento.setFontSize(10);
      documento.text(`Nome: ${cliente.nome}`, 10, yOffset);
      yOffset += 10;
      documento.text(`CPF: ${cliente.cpf}`, 10, yOffset);
      yOffset += 10;
      documento.text(`E-mail: ${cliente.email}`, 10, yOffset);
      yOffset += 10;
      documento.text(`Endereço: ${cliente.endereco}`, 10, yOffset);
      yOffset += 10;
      documento.text(`Telefone: ${cliente.telefone}`, 10, yOffset);
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
