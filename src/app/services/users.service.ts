import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'https://localhost:8081/api/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(API_URL);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${API_URL}/${id}`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post(API_URL, user);
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${API_URL}/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`);
  }
}
