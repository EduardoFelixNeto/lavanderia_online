import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = 'http://localhost:8080/';
  private currentUserSubject: BehaviorSubject<User | null>; // Armazenar o usuário atual usando BehaviorSubject
  public currentUser: Observable<User | null>; // Observable público para outras partes da aplicação se inscreverem


  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}user?email=${email}&password=${password}`).pipe(
      tap((users: User[]) => {
        if (users && users.length > 0) {
          this.currentUserSubject.next(users[0]); // Atualiza o currentUserSubject com o usuário retornado
        }
      })
    );
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}user`, user);
  }
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}user`);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}user/${id}`);
  }

}
