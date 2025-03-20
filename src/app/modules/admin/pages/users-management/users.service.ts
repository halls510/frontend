import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { MOCK_USERS } from 'src/app/mocks/mock-data';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users: User[] = MOCK_USERS.data;

  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  createUser(user: User): Observable<User> {
    user.id = this.users.length + 1;
    user.createdAt = new Date();
    user.updatedAt = new Date();
    this.users.push(user);
    return of(user);
  }

  updateUser(userId: number, userData: User): Observable<User> {
    const index = this.users.findIndex(u => u.id === userId);
    if (index > -1) {
      this.users[index] = { ...userData, updatedAt: new Date() };
    }
    return of(this.users[index]);
  }

  deleteUser(userId: number): Observable<void> {
    this.users = this.users.filter(u => u.id !== userId);
    return of();
  }
}
