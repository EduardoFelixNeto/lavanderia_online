import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-relatorio-receitas',
  templateUrl: './relatorio-receitas.component.html',
  styleUrls: ['./relatorio-receitas.component.css']
})
export class RelatorioReceitasComponent {
  dataInicial!: string;
  dataFinal!: string;
  receitas: any[] = [];

  constructor(private router : Router){}

  gerarRelatorio() {


    this.receitas = [
      { data: '2023-09-01', valor: 100 },
      { data: '2023-09-02', valor: 200 },
      { data: '2023-09-03', valor: 300 },
      { data: '2023-09-04', valor: 400 },
      { data: '2023-09-05', valor: 500 },
      { data: '2023-09-06', valor: 600 },
    ];
  }

  gerarPDF() {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Relatório de Receitas', 10, 10);

    let yPosition = 30;

    this.receitas.forEach(receita => {
      doc.text(`Data: ${receita.data} | Valor: ${receita.valor}`, 10, yPosition);
      yPosition += 10;
    });

    doc.save('relatorio-receitas.pdf');

  }

  goBack(){
    this.router.navigate(['/admin_homepage']);
  }
}
