import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../api-service';
import { API_CONFIG } from '@libs/api';
import { BehaviorSubject, lastValueFrom, Observable, Subject } from 'rxjs';
import { User } from '@libs/shared';
import { IUsersService } from './users.service.interface';
import { AuthService } from '@libs/auth';
import { jwtDecode, JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UsersService implements IUsersService {
  private readonly baseUrl = `${inject(API_CONFIG).apiUrl}/Users`;
  private readonly _httpClient = inject(ApiService).getClient();
  private readonly _authService = inject(AuthService);
  private $currentUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  getUserById(id: number): Observable<User> {
    return this._httpClient.get<User>(`${this.baseUrl}/${id}`);
  }

  getUsers(): Observable<User[]> {
    return this._httpClient.get<User[]>(this.baseUrl);
  }

  async setCurrentUser(): Promise<void> {
    const token = this._authService.getToken();
    if (!token) {
      this.$currentUser.next(null);
      return;
    }
    let decodedToken: (JwtPayload & { Id: number }) | undefined;

    try {
      decodedToken = jwtDecode(token);
    } catch (error) {
      console.error('Invalid token');
      this.$currentUser.next(null);
      return;
    }

    const user = await lastValueFrom(this.getUserById(decodedToken!.Id))
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return null;
      });

    if (!user) {
      this.$currentUser.next(null);
    }
    this.$currentUser.next(user);
  }

  getCurrentUser(): Observable<User | null> {
    return this.$currentUser.asObservable();
  }
}
