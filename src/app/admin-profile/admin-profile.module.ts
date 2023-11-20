import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { AtualizarAdminComponent } from './atualizar-admin/atualizar-admin.component';
import { RelatorioReceitasComponent } from './relatorio-receitas/relatorio-receitas.component';
import { RelatorioClientesFieisComponent } from './relatorio-clientes-fieis/relatorio-clientes-fieis.component';
import { RelatorioClientesComponent } from './relatorio-clientes/relatorio-clientes.component';
import { CpfMas2kDirective } from '../shared/directives/cpf-mask2.directive';
import { PhoneMask2Directive } from '../shared/directives/phone-mask2.directive';


@NgModule({
  declarations: [
    HomeComponent,
    RegisterComponent,
    AtualizarAdminComponent,
    RelatorioReceitasComponent,
    RelatorioClientesFieisComponent,
    RelatorioClientesComponent,
    CpfMas2kDirective,
    PhoneMask2Directive
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class AdminProfileModule { }
