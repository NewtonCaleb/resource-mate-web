import { Component, inject, OnInit, signal } from '@angular/core';
import { UsersService } from '@libs/api';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private readonly _usersService = inject(UsersService);
  userName = signal('');

  ngOnInit(): void {
    this._usersService.getCurrentUser().subscribe((user) => {
      this.userName.set(`${user?.firstName ?? '...'}`);
    });
  }

  fetchUsers() {
    this._usersService.getUsers().subscribe({
      next(value) {
        console.log(value);
      },
      error(err) {
        console.warn(err);
      },
    });
  }
}
