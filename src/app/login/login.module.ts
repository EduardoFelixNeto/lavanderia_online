import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { CpfMaskDirective } from '../shared/directives/cpf-mask.directive';
import { PhoneMaskDirective } from '../shared/directives/phone-mask.directive';
import { CepMaskDirective } from '../shared/directives/cep-mask.directive';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    CpfMaskDirective,
    PhoneMaskDirective,
    CepMaskDirective

  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class LoginModule { }
