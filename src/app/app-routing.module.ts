import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component'; // Importe os componentes que deseja rotear
import { RegisterComponent } from './login/register/register.component';
import { HomeComponent as UserProfileHomeComponent } from './user-profile/home/home.component';
import { ListarPedidoComponent } from './pedido/listar-pedido/listar-pedido.component';
import { InserirPedidoComponent } from './pedido/inserir-pedido/inserir-pedido.component';
import { HomeComponent as AdminProfileHomeComponent } from './admin-profile/home/home.component';
import { ManutencaoItemComponent } from './item/manutencao-item/manutencao-item.component';
import { InserirItemComponent } from './item/inserir-item/inserir-item.component';
import { AtualizarItemComponent } from './item/atualizar-item/atualizar-item.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Rota padrão
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'user_homepage', component: UserProfileHomeComponent},
  { path: 'pedidos_page', component:ListarPedidoComponent},
  { path: 'novo_pedido_page', component:InserirPedidoComponent},
  { path: 'admin_homepage', component: AdminProfileHomeComponent},
  { path: 'item_page', component: ManutencaoItemComponent},
  { path: 'inserir_item', component: InserirItemComponent},
  { path: 'atualizar-item/:id', component: AtualizarItemComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
