import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { LoginPage } from '@libs/auth';
import { Header } from '@libs/shared';
import { AuthService } from '@libs/auth';

import { inject, PLATFORM_ID } from '@angular/core';
import { AuthorizedLayoutComponent } from './layouts/authorized-layout.component/authorized-layout.component';
import { isPlatformBrowser } from '@angular/common';

const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  const _authService = inject(AuthService);
  const _router = inject(Router);
  const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  if (!isBrowser) return true;

  if (_authService.isAuthenticated()) {
    return true;
  }

  _router.navigate(['login']);
  return false;
};

export const routes: Routes = [
  {
    path: '',
    component: AuthorizedLayoutComponent,
    canActivateChild: [authGuard],
    children: [
      {
        path: '',
        component: Header,
      },
      {
        path: 'agencies',
        component: Header,
      },
      {
        path: 'services',
        component: Header,
      },
    ],
  },
  {
    path: 'login',
    component: LoginPage,
  },
];
