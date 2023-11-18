import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { PedidoService } from 'src/app/pedido/services/pedido.service';
import { RevenueReport } from 'src/app/shared/models/revenue-report';

@Component({
  selector: 'app-relatorio-receitas',
  templateUrl: './relatorio-receitas.component.html',
  styleUrls: ['./relatorio-receitas.component.css']
})
export class RelatorioReceitasComponent {
  dataInicial!: Date;
  dataFinal!: Date;
  reportData: RevenueReport[] = [];

  constructor(private pedidoService: PedidoService, private router : Router){}

  gerarRelatorio() {
    this.pedidoService.getRevenueReport(this.dataInicial, this.dataFinal).subscribe(
      data => {
        this.reportData = data;
        console.log('Updated Report Data:', this.reportData);
      },
      error => {
        console.error('Error fetching report data', error);
      }
    );
  }

  gerarPDF() {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Relatório de Receitas', 10, 10);

    doc.setFontSize(12);
    let yPosition = 30;

    this.reportData.forEach(receita => {
      const line = `Data: ${receita.date} | Receita: ${receita.totalRevenue.toFixed(2)} | Pedidos: ${receita.ordersCount} | Média por Pedido: ${receita.averageOrderValue?.toFixed(2)}`;
      doc.text(line, 10, yPosition);
      yPosition += 10;
    });

    doc.save('relatorio-receitas.pdf');
  }

  goBack(){
    this.router.navigate(['/admin_homepage']);
  }
}
