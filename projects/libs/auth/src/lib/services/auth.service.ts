import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '@libs/api';
import { Login } from '../models/login';
import { isPlatformBrowser } from '@angular/common';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = inject(API_CONFIG).apiUrl;
  private readonly _router = inject(Router);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly client = inject(HttpClient);
  private token: string | null = this.isBrowser ? localStorage.getItem('access-token') : null;

  private setToken(token: string): void {
    if (this.isBrowser) {
      this.token = token;
      localStorage.setItem('access-token', token);
    } else {
      console.log('Local storage is not available');
      return;
    }
  }

  private clearToken(): void {
    if (this.isBrowser) {
      this.token = null;
      localStorage.removeItem('access-token');
      this._router.navigate(['login']);
    }
  }

  getToken(): string | null {
    if (this.isBrowser) {
      return this.token;
    } else {
      return null;
    }
  }

  isAuthenticated(): boolean {
    try {
      return this.getToken() !== null && this.getToken()?.trim() !== '' ? true : false;
    } catch (error) {
      return false;
    }
  }

  logout(): void {
    this.clearToken();
  }

  async login(credentials: Login): Promise<boolean> {
    return await lastValueFrom(this.client.post(`${this.baseUrl}/Users/Login`, credentials))
      .then((res: any) => {
        if (res['token']) {
          try {
            this.setToken(res['token']);
          } catch (error) {
            return false;
          }
        }

        return true;
      })
      .catch((e) => {
        return false;
      });
  }
}
