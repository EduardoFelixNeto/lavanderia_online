import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/shared/models/item.model';
import { ItemService } from '../services/item.service';
import { ItemModule } from '../item.module';

@Component({
  selector: 'app-manutencao-item',
  templateUrl: './manutencao-item.component.html',
  styleUrls: ['./manutencao-item.component.css']
})
export class ManutencaoItemComponent {

  itens: Item[] = [];

  constructor(private router: Router, private itemService: ItemService){}

  returnHomePage(): void {
      this.router.navigate(['/admin_homepage'])
  }

  novoItem(): void {
    this.router.navigate(['/inserir_item']); // 3. Use o método navigate
  }

  excluirItem(id: number): void {
    this.itemService.deleteItem(id).subscribe(() => {
      this.itens = this.itens.filter(item => item.id !== id);
    }, error => {
      console.error(`Error when trying to delete item with id ${id}`, error);
    });
  }
  

  ngOnInit(): void {
    if (this.itens) {
      this.itemService.listAll().subscribe(data => {
        this.itens = data;
      }, error => {
        // Você pode adicionar tratamento de erro aqui
        console.error('Erro ao buscar itens', error);
      });
    } else {
      // Lidar com erro - usuário não logado
      console.warn('Usuário não está logado');
    }
  }

  goToUpdatePage(itemId: number): void {
    // Navigates to the update item page with the item ID
    this.router.navigate(['/atualizar-item', itemId]);
  }
}
