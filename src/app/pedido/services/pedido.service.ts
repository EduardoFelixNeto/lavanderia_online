import { Injectable } from '@angular/core';
import { Pedido } from 'src/app/shared/models/pedido.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { LinhaPedido } from 'src/app/shared/models/linha-pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private apiUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  listByCustomerId(customerId: number): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}transaction?customerId=${customerId}`);
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

  listByCustomerIdAndStatus(customerId: number, status: string): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}transaction/customerId/${customerId}/status/${status}`);
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

  deleteTransactionLine(id: number){
    return this.http.delete<void>(`${this.apiUrl}transactionLine/id/${id}`);
  }


}
