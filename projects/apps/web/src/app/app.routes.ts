import { Routes } from '@angular/router';
import { LoginPage } from '@libs/auth';
import { Header } from '@libs/shared';

export const routes: Routes = [
  {
    path: '',
    component: Header,
  },
  {
    path: 'test',
    component: LoginPage,
  },
];
