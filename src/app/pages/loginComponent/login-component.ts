// src/app/pages/loginComponent/login-component.ts
// src/pages/loginComponent/login-component.ts
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login-component.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./login-component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    console.log(this.loginForm);
    if (this.loginForm.valid) {
      console.log('Form Data:', this.loginForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
