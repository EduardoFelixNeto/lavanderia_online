import { Injectable } from '@angular/core';
import { Item } from 'src/app/shared/models/item.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  listAll(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiUrl}itens`);
  }
}
