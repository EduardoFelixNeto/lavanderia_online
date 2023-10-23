export class LinhaPedido {
    id!: number;
    transactionId!: number;
    customerId!: number
    itemId!: number;
    quantity: number;
    term!: number;
    totalAmount!: number;
    createdAt!: Date;
  
    constructor(transactionId: number, customerId: number, itemId: number, quantity: number, date: Date) {
      this.transactionId = transactionId;
      this.customerId = customerId;
      this.itemId = itemId;
      this.quantity = quantity;
      this.createdAt = date;
    }
  }