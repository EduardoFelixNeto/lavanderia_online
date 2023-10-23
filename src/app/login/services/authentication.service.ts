import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Customer } from 'src/app/shared/models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = 'http://localhost:8080/';
  private currentCustomerSubject: BehaviorSubject<Customer | null>; // Armazenar o usuário atual usando BehaviorSubject
  public currentCustomer: Observable<Customer | null>; // Observable público para outras partes da aplicação se inscreverem

  constructor(private http: HttpClient) {
    this.currentCustomerSubject = new BehaviorSubject<Customer | null>(null);
    this.currentCustomer = this.currentCustomerSubject.asObservable();
  }

  login(email: string, password: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}customer?email=${email}&password=${password}`).pipe(
      tap((customers: Customer[]) => {
        if (customers && customers.length > 0) {
          this.currentCustomerSubject.next(customers[0]); // Atualiza o currentCustomerSubject com o usuário retornado
        }
      })
    );
  }

  getCurrentCustomer(): Customer | null {
    return this.currentCustomerSubject.value;
  }

  register(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.apiUrl}customer`, customer);
  }
  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}customer`);
  }

  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}customer/${id}`);
  }

}
