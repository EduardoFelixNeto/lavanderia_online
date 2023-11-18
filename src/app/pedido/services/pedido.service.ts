import { Injectable } from '@angular/core';
import { Pedido } from 'src/app/shared/models/pedido.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { map } from 'rxjs';
import { LinhaPedido } from 'src/app/shared/models/linha-pedido.model';
import { RevenueReport } from 'src/app/shared/models/revenue-report';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private apiUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  listByUserId(userId: number): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}transaction/userId/${userId}`);
  }
  listAll(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}transaction`);
  }

  createTransaction(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.apiUrl}transaction`, pedido);
  }

  createTransactionLine(linhaPedido: LinhaPedido): Observable<LinhaPedido> {
    return this.http.post<LinhaPedido>(`${this.apiUrl}transactionLine`, linhaPedido);
  }

  listByUserIdAndStatus(userId: number, status: string): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}transaction/userId/${userId}/status/${status}`);
  }

  addPedido(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.apiUrl}transaction`, pedido);
  }

  getLastPedidoId(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}transaction/maxId`);
  }

  getLastTransactionLineId(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}transactionLine/maxId`);
  }

  deleteTransactionLine(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}transactionLine/${id}`);
  }

  updatePedido(pedido: Pedido): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.apiUrl}transaction/${pedido.id}`, pedido);
  }

  listByPedidoId(pedidoId: number): Observable<LinhaPedido[]> {
    return this.http.get<LinhaPedido[]>(`${this.apiUrl}transactionLine/transactionId/${pedidoId}`);
  }

  listAllbyStatus(status: string){
    return this.http.get<Pedido[]>(`${this.apiUrl}transaction/status/${status}`);
  }

  getRevenueReport(dataInicial: any, dataFinal: any): Observable<RevenueReport[]> {
    let params = new HttpParams()
        .set('startDate', this.formatDate(dataInicial))
        .set('endDate', this.formatDate(dataFinal));
  
        return this.http.get<RevenueReport[]>(`${this.apiUrl}transaction/revenueReport`, { params })
        .pipe(tap(data => console.log('Revenue Report Data:', data)));
  }
  
  private formatDate(date: any): string {
    if (!date) return ''; // If date is null or undefined, return an empty string
  
    let dateObj = (date instanceof Date) ? date : new Date(date);
    // If date is already a Date object, use it; otherwise, try to convert it to a Date
  
    return dateObj.toISOString().split('T')[0]; // Converts the date to 'YYYY-MM-DD' format
  }
  

}
