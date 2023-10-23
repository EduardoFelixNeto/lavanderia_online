import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Customer } from 'src/app/shared/models/customer.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  customer!: Customer;
  message!: string;

  constructor(private authService: AuthenticationService, private router: Router) { }

  onLogin(): void {
    this.authService.login(this.email, this.password).subscribe(
      (customers) => {
        if (customers.length > 0) {
          for (let index = 0; index < customers.length; index++) {
            const em = customers[index].email;
            const pwd = customers[index].password;
            if (this.email == em && this.password == pwd) {
              this.customer = customers[index];
              if (this.customer.profile == 'customer') {
                this.router.navigate(['/customer_homepage']);
              }
            } else {
              this.message = 'Erro ao fazer login! Verifique suas credenciais.';
            }
          }
        }
      }
    );
  }

  onRegister(): void {
    this.router.navigate(['/register']); // 3. Use o método navigate
  }
}
