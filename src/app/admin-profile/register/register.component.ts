import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/login/services/authentication.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = {
    email: '',
    password: '',
    name: ''
  };
  message!: string;


  constructor(private authService: AuthenticationService, private router: Router, private http: HttpClient) { } // Injete o serviço aqui

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
        profile: 'admin',
        cpf: this.user.cpf,
        name: this.user.name,
        address: this.user.address,
        phone: this.user.phone
      };
      this.authService.register(newUser).subscribe((response: User) => {
        this.returnToAdminPage();

      });
    });
  }

  returnToAdminPage(): void {
    this.router.navigate(['/admin_homepage']); // 3. Use o método navigate
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
