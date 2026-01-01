import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Login } from '../../models/login';
import { Router } from '@angular/router';
import { LogoComponent } from '@libs/shared';

@Component({
  selector: 'lib-login-page.component.ts',
  imports: [ReactiveFormsModule, LogoComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPage implements OnInit {
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);
  loading = signal(false);
  error = signal(false);

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit(): void {
    if (this._authService.isAuthenticated()) {
      this._router.navigate(['']);
    }
  }

  async login() {
    this.loading.set(true);
    this.error.set(false);
    const cred = this.loginForm.value as Login;
    const isLoggedIn = await this._authService.login(cred);
    if (isLoggedIn) {
      this._router.navigate(['']);
    }

    this.error.set(true);
    this.loading.set(false);
  }
}
