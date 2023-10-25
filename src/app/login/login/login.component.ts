import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { User } from 'src/app/shared/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  user!: User;
  message!: string;

  constructor(private authService: AuthenticationService, private router: Router) { }

  onLogin(): void {
    this.authService.login(this.email, this.password).subscribe(
      (user) => {
        if (user) {
          this.user = user;

          // Navigate based on user profile
          if (this.user.profile === 'user') {
            this.router.navigate(['/user_homepage']);
          } else {
            // Navigate to other pages based on other profiles (if necessary)
          }
        }
      },
      (error) => {
        // Handle error response
        this.message = 'Erro ao fazer login! Verifique suas credenciais.';
      }
    );
}


  onRegister(): void {
    this.router.navigate(['/register']); // 3. Use o método navigate
  }
}
