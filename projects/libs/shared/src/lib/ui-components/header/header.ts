import { Component, inject, input, model } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@libs/auth';

@Component({
  selector: 'shared-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private readonly _authService = inject(AuthService);
  sideNavExpanded = model(true);
  logo = input('');

  logout() {
    this._authService.logout();
    console.log(this._authService.isAuthenticated());
  }
}
