import { Component } from '@angular/core';
import { Item } from 'src/app/shared/models/item.model';
import { ItemService } from '../services/item.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-atualizar-item',
  templateUrl: './atualizar-item.component.html',
  styleUrls: ['./atualizar-item.component.css']
})
export class AtualizarItemComponent {

  constructor(private itemService: ItemService, private router: Router, private route: ActivatedRoute) { }

  item: Item = {}

  message!: string;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const itemId = +params['id']; // '+' converts the parameter to a number
      this.getItem(itemId);
    });
  }

  getItem(id: number): void {
    this.itemService.getItembyId(id).subscribe(
      data => {
        this.item = data;
        // Populate your form here
      },
      error => {
        console.error('Error fetching item data', error);
      }
    );
  }

  returnItemPage(): void {
    this.router.navigate(['/item_page'])
  }

  onUpdate(): void {
    this.item.updatedAt = new Date();
    this.itemService.updateItem(this.item.id!, this.item).subscribe(
      response => {
        console.log('Item updated successfully', response);
        this.returnItemPage();
      },
      error => {
        console.error('Error updating item', error);
        this.message = 'Erro ao atualizar item.'; 
      }
    );
  }
}
