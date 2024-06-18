import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TransactionTrackerComponent } from './components/Transactions/transaction-tracker/transaction-tracker.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TransactionTrackerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MoneyManager';
}
