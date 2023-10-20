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

  constructor(private authService: AuthenticationService, private router: Router) {}

  onLogin(): void {
    console.log('Email:', this.email, 'Password:', this.password);
    this.authService.login(this.email, this.password).subscribe(
      (users) => {
        if (users && users.length > 0) {
          this.user = users[0];
          if (this.user.profile == 'user') {
          this.router.navigate(['/user_homepage']); // 3. Use o método navigate
          // Aqui você pode redirecionar para uma página inicial ou outra página conforme o perfil.
          }
        } else {
          this.message = 'Erro ao fazer login! Verifique suas credenciais.';
        }
      },
      (err) => {
        this.message = 'Erro ao fazer login! Verifique suas credenciais.';
      }
    );
  }
  
  onRegister(): void {
    this.router.navigate(['/register']); // 3. Use o método navigate
    }
}
