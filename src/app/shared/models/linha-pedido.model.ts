import { Item } from "./item.model";

export class LinhaPedido {
    item: Item;
    quantidade: number;
    total: number;
  
    constructor(item: Item, quantidade: number) {
      this.item = item;
      this.quantidade = quantidade;
      this.total = (item.amount || 0) * quantidade;
    }
  }