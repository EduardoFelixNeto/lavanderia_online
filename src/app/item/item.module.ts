import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManutencaoItemComponent } from './manutencao-item/manutencao-item.component';
import { InserirItemComponent } from './inserir-item/inserir-item.component';
import { FormsModule } from '@angular/forms';
import { AtualizarItemComponent } from './atualizar-item/atualizar-item.component';



@NgModule({
  declarations: [
    ManutencaoItemComponent,
    InserirItemComponent,
    AtualizarItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ItemModule { }
