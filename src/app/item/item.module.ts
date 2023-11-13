import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManutencaoItemComponent } from './manutencao-item/manutencao-item.component';
import { InserirItemComponent } from './inserir-item/inserir-item.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ManutencaoItemComponent,
    InserirItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ItemModule { }
