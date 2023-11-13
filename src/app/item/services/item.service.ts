import { Injectable } from '@angular/core';
import { Item } from 'src/app/shared/models/item.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private apiUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  listAll(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiUrl}item`);
  }

  deleteItem(id: number): Observable<void> {
    console.log(`${this.apiUrl}item/${id}`);
    return this.http.delete<void>(`${this.apiUrl}item/${id}`);
  }

  register(item: Item): Observable<Item> {
    return this.http.post<Item>(`${this.apiUrl}item`, item);
  }
}
