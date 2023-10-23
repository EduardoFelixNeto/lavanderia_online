import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service'; // Importe o serviço aqui
import { Customer } from 'src/app/shared/models/customer.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  customer: Customer = {
    email: '',
    password: ''
  };
  message!: string;


  constructor(private authService: AuthenticationService, private router: Router) {} // Injete o serviço aqui

  onSubmit(): void {
    // Primeiro, verificamos se o usuário já está registrado
    this.authService.getAllCustomers().subscribe(allCustomers => {
        if (allCustomers.some(customer => customer.email === this.customer.email)) {
            this.message = 'E-mail já registrado!';
            return;
        }

        // Se o e-mail não estiver registrado, prossiga com o registro
        const now = new Date();
        const maxId = Math.max(...allCustomers.filter(customer => customer.id !== undefined).map(customer => customer.id!));
        const newCustomer: Customer = {
            id: maxId + 1,
            email: this.customer.email,
            password: this.customer.password,
            name: this.customer.name,
            cpf: this.customer.cpf,
            address: this.customer.address,
            phone: this.customer.phone,
            profile: 'customer',
            createdAt: now
        };
        this.authService.register(newCustomer).subscribe((response: Customer) => {
            this.returnLoginPage();
        });
    });
}

  returnLoginPage(): void {
    this.router.navigate(['/login']); // 3. Use o método navigate
  }
}
