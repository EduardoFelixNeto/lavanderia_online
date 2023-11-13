import { Component } from '@angular/core';
import { Item } from 'src/app/shared/models/item.model';
import { ItemService } from '../services/item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inserir-item',
  templateUrl: './inserir-item.component.html',
  styleUrls: ['./inserir-item.component.css']
})
export class InserirItemComponent {

  constructor(private itemService: ItemService, private router: Router) { }

  item: Item = {}

  message!: string;

  returnItemPage(): void {
    this.router.navigate(['/item_page'])
  }

  onSubmit(): void {
    // Primeiro, verificamos se o usuário já está registrado
    this.itemService.listAll().subscribe(allItens => {
      if (allItens.some(item => item.name === this.item.name)) {
        this.message = 'Item já registrado!'; 
        return;
      }

      // Se o e-mail não estiver registrado, prossiga com o registro
      const maxId = Math.max(...allItens.filter(item => item.id !== undefined).map(item => item.id!));
      const newItem: Item = {
        id: maxId + 1,
        name: this.item.name,
        amount: this.item.amount,
        term: this.item.term,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      console.log(newItem);
      this.itemService.register(newItem).subscribe((response: Item) => {
        this.returnItemPage();
      });
    });
  }
}
