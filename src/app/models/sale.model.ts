// Representa valores monetários
export interface Money {
  amount: number;
  currency: string;
}

// Entidade principal de venda (Sales)
export interface Sale {
  id: number;
  saleNumber: string;
  saleDate: string;
  customerId: number;
  customerName: string;
  branch: string;
  items: SaleItem[];
  totalValue: Money;
  status: SaleStatus;
}

// Item da venda (Sales)
export interface SaleItem {
  id: number;
  saleId: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: Money;
  discount: Money;
  total: Money;
  status: SaleItemStatus;
}

// Enum opcional para facilitar comparação de status
export type SaleStatus = 'Completed' | 'Cancelled';
export type SaleItemStatus = 'Confirmed' | 'Cancelled';

// DTO para GET de uma venda
export interface GetSaleResult {
  saleId: number;
  saleNumber: string;
  saleDate: string;
  customerId: number;
  customerName: string;
  totalValue: Money;
  branch: string;
  status: string;
  items: SaleItemResult[];
}

// DTO para item da venda no resultado (GetSaleResult)
export interface SaleItemResult {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: Money;
  discount: Money;
  total: Money;
  status: string;
}
