export interface Transaction {
  type: 'expense' | 'transfer' | 'income';
  description: string;
  dateTime: Date;
  amount: number;
  category?: string;
  from?: string
  to?: string
}

