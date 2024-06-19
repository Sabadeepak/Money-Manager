import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-expense-chart',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './expense-chart.component.html',
  styleUrl: './expense-chart.component.css'
})
export class ExpenseChartComponent implements OnInit, OnChanges {

  @Input() transactionData: string = '';

  chart: am4charts.PieChart | null = null;

  totalSpending: number = 0;
  totalIncome: number = 0;
  balanceTotal: number = 0;
  fromDate: string = '';
  toDate: string = '';

  ngOnInit() {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['transactionData']) {
      this.updateChart();
    }
  }

  createChart(): void {
    this.chart = am4core.create('chartdiv', am4charts.PieChart);
    this.updateChart();
    const series = this.chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = 'amount';
    series.dataFields.category = 'category';
    this.chart.legend = new am4charts.Legend();
  }

  updateChart(): void {
    if (this.chart && this.transactionData) {
      const chartData = this.createChartData();
      this.chart.data = chartData;
      this.totalSpending = chartData.reduce((acc, value) => acc + value.amount, 0);
      this.balanceTotal = this.totalIncome - this.totalSpending;
    }
  }

  createChartData(): any[] {
    const transactions = JSON.parse(this.transactionData);
    const fromDate = this.fromDate ? new Date(this.fromDate) : null;
    const toDate = this.toDate ? new Date(this.toDate) : null;
    this.totalIncome = 0;
    const expenseCategories: { [key: string]: number } = {};

    transactions.forEach((transaction: any) => {
      const transactionDate = new Date(transaction.dateTime);
      if ((!fromDate || transactionDate >= fromDate) && (!toDate || transactionDate <= toDate)) {
        if (transaction.type === 'expense' && transaction.category) {
          if (!expenseCategories[transaction.category]) {
            expenseCategories[transaction.category] = 0;
          }
          expenseCategories[transaction.category] += transaction.amount;
        }
        if (transaction.type === 'income') {
          this.totalIncome += transaction.amount;
        }
      }
    });

    return Object.keys(expenseCategories).map(category => ({
      category,
      amount: expenseCategories[category]
    }));
  }
}

