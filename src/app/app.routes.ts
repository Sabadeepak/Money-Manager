import { Routes } from '@angular/router';
import { TransactionTrackerComponent } from './components/Transactions/transaction-tracker/transaction-tracker.component';
import { LoginComponent } from './components/Login-Page/login/login.component';


export const routes: Routes = [

    { path: '', redirectTo: '/loginPage', pathMatch: 'full' },
    { path: "loginPage", component: LoginComponent },
    { path: "transactionTracker", component: TransactionTrackerComponent },

];
