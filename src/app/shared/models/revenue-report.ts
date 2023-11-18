export class RevenueReport {
    date: string;       // The date for the revenue data, typically in 'YYYY-MM-DD' format
    totalRevenue: number;    // Total revenue for this date
    // Additional fields depending on what your backend returns and what you need in the report
    // For example, number of orders, average order value, etc.
    ordersCount?: number;  // Optional: number of orders for this date
    averageOrderValue?: number;  // Optional: average order value for this date
  
    constructor(date: string, totalRevenue: number, ordersCount?: number, averageOrderValue?: number) {
      this.date = date;
      this.totalRevenue = totalRevenue;
      this.ordersCount = ordersCount;
      this.averageOrderValue = averageOrderValue;
    }
  }