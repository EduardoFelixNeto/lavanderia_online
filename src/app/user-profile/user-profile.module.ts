import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ModalPedidoComponent } from '../pedido/modal-pedido/modal-pedido.component';
import { ModalConsultarPedidoComponent } from '../pedido/modal-consultar-pedido/modal-consultar-pedido.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserProfileModule { }
