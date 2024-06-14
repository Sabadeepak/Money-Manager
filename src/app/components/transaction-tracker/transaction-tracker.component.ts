import { Component } from '@angular/core';
import { Transaction } from '../../model/transaction';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExpenseChartComponent } from '../expense-chart/expense-chart.component';

@Component({
  selector: 'app-transaction-tracker',
  standalone: true,
  imports: [FormsModule, CommonModule, ExpenseChartComponent],
  templateUrl: './transaction-tracker.component.html',
  styleUrl: './transaction-tracker.component.css'
})
export class TransactionTrackerComponent {

  transferTransactions: Transaction[] = [];
  transactions: Transaction[] = [];
  transaction: Transaction = { type: 'expense', description: '', dateTime: new Date(), amount: 0, category: 'food' };
  needToEdit: boolean = false;
  editedIndex: number = -1;

  constructor() {
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
      this.transactions = JSON.parse(savedTransactions);
    }

    const savedTransferTransactions = localStorage.getItem('transferTransactions');
    if (savedTransferTransactions) {
      this.transferTransactions = JSON.parse(savedTransferTransactions);
    }
    this.alllTransactions();
  }

  setTransactionType(type: 'expense' | 'income' | 'transfer') {
    this.transaction.type = type;
  }

  addTransaction() {
    if (!this.transaction.type) return;
    let transaction: Transaction;

    if (this.transaction.type === 'transfer') {
      transaction = {
        ...this.transaction,
        type: this.transaction.type
      };
      this.transferTransactions.unshift(transaction);
      this.updateLocalStorage('transferTransactions');
    } else {
      transaction = {
        ...this.transaction,
        type: this.transaction.type
      };
      this.transactions.unshift(transaction);
      this.updateLocalStorage('transactions');
    }
    this.clearForm();
  }

  deleteTransaction(index: number, type: 'expense' | 'income' | 'transfer') {
    if (type === 'transfer') {
      this.transferTransactions.splice(index, 1);
      this.updateLocalStorage('transferTransactions');
    } else {
      this.transactions.splice(index, 1);
      this.updateLocalStorage('transactions');
    }
  }

  editTransaction(index: number) {
    this.transaction = { ...this.transactions[index] };
    this.needToEdit = true;
    this.editedIndex = index;
  }

  saveEdit() {
    this.transactions[this.editedIndex] = { ...this.transaction };
    this.clearForm();
    this.updateLocalStorage('transactions');
  }

  clearForm() {
    this.transaction = {
      type: this.transaction.type,
      description: '',
      dateTime: new Date(),
      amount: this.transaction.amount,
      category: this.transaction.category
    };
    this.needToEdit = false;
    this.editedIndex = -1;
  }

  trasactionDataToJson(): string {
    return JSON.stringify(this.transactions);
  }

  private updateLocalStorage(type: string) {
    if (type === 'transactions') {
      localStorage.setItem('transactions', JSON.stringify(this.transactions));
    } else if (type === 'transferTransactions') {
      localStorage.setItem('transferTransactions', JSON.stringify(this.transferTransactions));
    }
  }
  alllTransactions() {
    const allTransactions: { [year: string]: { [month: string]: { [day: string]: Transaction[] } } } = {};

    this.transactions.forEach(transaction => {
      const date = new Date(transaction.dateTime);
      const year = date.getFullYear().toString();
      const month = (date.getMonth() + 1).toString();
      const day = date.getDate().toString();


      if (!allTransactions[year]) {
        allTransactions[year] = {};
      }
      if (!allTransactions[year][month]) {
        allTransactions[year][month] = {};
      }
      if (!allTransactions[year][month][day]) {
        allTransactions[year][month][day] = [];
      }
      allTransactions[year][month][day].push(transaction);
    });
    console.log(allTransactions)

  }

}
