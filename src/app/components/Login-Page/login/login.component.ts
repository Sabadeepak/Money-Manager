import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginForm: FormGroup;
  login: boolean = true;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.login) {
      this.Login();
    } else {
      this.signup();
    }
  }

  changeMode(): void {
    this.login = !this.login;
    this.loginForm.reset();
  }

  private Login(): void {

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === this.loginForm.value.email && user.password === this.loginForm.value.password);

    if (user) {

      this.router.navigate(["/transactionTracker"]);
      console.log('Login successfullllllll!');

    } else {
      console.log('Please try again');

    }
  }

  private signup(): void {

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const existingUser = users.find(user => user.email === this.loginForm.value.email);
    if (existingUser) {
      console.log('exositing user');
      return;
    }

    users.push({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });

    localStorage.setItem('users', JSON.stringify(users));

    console.log('Signup successful!');

  }
}
