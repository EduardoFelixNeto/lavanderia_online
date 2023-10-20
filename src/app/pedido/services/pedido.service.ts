import { Injectable } from '@angular/core';
import { Pedido } from 'src/app/shared/models/pedido.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  listByUserId(userId: number): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}pedidos?userId=${userId}`);
  }
  listAll(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}pedidos`);
  }

  createTransaction(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.apiUrl}pedidos`, pedido);
  }

  listByUserIdAndStatus(userId: number, status: string): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}pedidos?userId=${userId}&status=${status}`);
  }

  addPedido(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.apiUrl}pedidos`, pedido);
  }

  getLastPedidoId(): Observable<number> {
    return this.http.get<Pedido[]>(`${this.apiUrl}pedidos?_sort=id&_order=desc&_limit=1`).pipe(
      map(pedidos => pedidos[0]?.id || 0)
    );
  }

}
