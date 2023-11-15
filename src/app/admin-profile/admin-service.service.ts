import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../shared/models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  updateAdmin(id: number, adminDetails: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}user/${id}`, adminDetails);
  }
  getAdmin(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}user/${id}`);
  }

  private apiUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  getAllAdmins(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}user/profile/admin`);
  }

  deleteAdmin(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}user/${id}`);
  }
}
