import { Routes } from '@angular/router';
import { TransactionTrackerComponent } from './components/Transactions/transaction-tracker/transaction-tracker.component';
import { LoginComponent } from './components/Login-Page/login/login.component';


export const routes: Routes = [

    { path : "transactionTracker", component:TransactionTrackerComponent },
    { path : "loginPage" , component:LoginComponent }

];
