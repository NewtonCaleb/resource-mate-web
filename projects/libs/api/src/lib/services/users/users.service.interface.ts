import { User } from '@libs/shared';
import { Observable } from 'rxjs';

export interface IUsersService {
  getUserById(id: number): Observable<User>;
  getUsers(): Observable<User[]>;
  setCurrentUser(): any;
  getCurrentUser(): any;
}
