import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Login } from '../../models/login';

@Component({
  selector: 'lib-login-page.component.ts',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.ts.html',
  styleUrl: './login-page.component.ts.css',
})
export class LoginPage {
  private readonly authService = inject(AuthService);

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  login() {
    const cred = this.loginForm.value as Login;

    this.authService.login(cred);
  }

  test() {
    this.authService.test().subscribe((v) => console.log(v));
  }
}
