import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '@libs/api';
import { Login } from '../models/login';
import { isPlatformBrowser } from '@angular/common';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = inject(API_CONFIG).apiUrl;
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly client = inject(HttpClient);
  private token: string | null = this.isBrowser ? localStorage.getItem('access-token') : null;

  private setToken(token: string): void {
    if (this.isBrowser) {
      this.token = token;
      localStorage.setItem('access-token', token);
    } else {
      throw Error('Local storage is not available');
    }
  }

  getToken(): string | null {
    if (this.isBrowser) {
      return this.token;
    } else {
      throw Error('Local storage is not available');
    }
  }

  private clearToken(): void {
    if (this.isBrowser) {
      this.token = null;
      localStorage.removeItem('access-token');
    }
  }

  test() {
    return this.client.get(`${this.baseUrl}/Users/GetAll`);
  }

  async login(credentials: Login): Promise<boolean> {
    return await lastValueFrom(this.client.post(`${this.baseUrl}/Users/Login`, credentials)).then(
      (res: any) => {
        if (res['token']) {
          try {
            this.setToken(res['token']);
          } catch (error) {
            return false;
          }
        }

        return true;
      }
    );
    // this.client.post(`${this.baseUrl}/Users/Login`, credentials).subscribe({
    //   next: (res: any) => {
    //     if (res['token']) {
    //       try {
    //         this.setToken(res['token']);
    //       } catch (error) {
    //         return;
    //       }
    //     }

    //     loggedIn = true;
    //   },
    //   error: (err: any) => {
    //     console.error(err);
    //     this.clearToken();
    //   },
    // });
  }
}

interface LoginSuccess extends Object {
  token: string;
}
