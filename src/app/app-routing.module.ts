import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component'; // Importe os componentes que deseja rotear
import { RegisterComponent } from './login/register/register.component';
import { HomeComponent } from './user-profile/home/home.component';
import { ListarPedidoComponent } from './pedido/listar-pedido/listar-pedido.component';
import { InserirPedidoComponent } from './pedido/inserir-pedido/inserir-pedido.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Rota padrão
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'user_homepage', component: HomeComponent},
  { path: 'pedidos_page', component:ListarPedidoComponent},
  { path: 'novo_pedido_page', component:InserirPedidoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
