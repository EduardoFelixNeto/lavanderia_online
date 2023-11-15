import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { AtualizarAdminComponent } from './atualizar-admin/atualizar-admin.component';



@NgModule({
  declarations: [
    HomeComponent,
    RegisterComponent,
    AtualizarAdminComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class AdminProfileModule { }
