export class LinhaPedido {
    id!: number;
    transactionId!: number;
    userId!: number;
    itemId!: number;
    itemName!: string;
    quantity: number;
    term!: number;
    totalAmount!: number;
  
    constructor(transactionId: number, userId: number, itemId: number, itemName: string, quantity: number) {
      this.transactionId = transactionId;
      this.userId = userId;
      this.itemId = itemId;
      this.itemName = itemName;
      this.quantity = quantity;
    }
  }