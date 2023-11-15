import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HomeComponent as UserHomeComponent } from './user-profile/home/home.component';
import { PedidoModule } from './pedido/pedido.module';
import { AdminProfileModule } from './admin-profile/admin-profile.module';

@NgModule({
  declarations: [
    AppComponent,
    UserHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    HttpClientModule,
    FormsModule,
    PedidoModule,
    AdminProfileModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
