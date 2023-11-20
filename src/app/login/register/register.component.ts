import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service'; // Importe o serviço aqui
import { User } from 'src/app/shared/models/user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  user: User = {
    email: '',
    password: ''
  };
  message!: string;


  constructor(private authService: AuthenticationService, private router: Router, private http: HttpClient) { }

  onSubmit(): void {
    // Primeiro, verificamos se o usuário já está registrado
    this.authService.getAllUsers().subscribe(allUsers => {
      if (allUsers.some(user => user.email === this.user.email)) {
        this.message = 'E-mail já registrado!';
        return;
      }

      // Se o e-mail não estiver registrado, prossiga com o registro
      const maxId = Math.max(...allUsers.filter(user => user.id !== undefined).map(user => user.id!));
      const newUser: User = {
        id: maxId + 1,
        email: this.user.email,
        password: '',
        profile: 'user',
        cpf: this.user.cpf,
        name: this.user.name,
        cep: this.user.cep,
        address: this.user.address,
        phone: this.user.phone
      };
      this.authService.register(newUser).subscribe((response: User) => {
        this.returnLoginPage();

      });
    });
  }

  returnLoginPage(): void {
    this.router.navigate(['/login']); // 3. Use o método navigate
  }

  buscarCep() {
    if (this.user.cep && this.user.cep.length == 8) {
      this.http.get(`https://viacep.com.br/ws/${this.user.cep}/json/`).subscribe((endereco: any) => {
        if (!endereco.erro) {
          this.user.address = `${endereco.logradouro}, ${endereco.bairro}, ${endereco.localidade} - ${endereco.uf}`;
        } else {
          console.log('CEP Nao Encontrado')
        }
      }, () => {
      });
    }
  }
}

