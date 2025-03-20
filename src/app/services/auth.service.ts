import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/auth'; // 🔥 Substitua pelo endpoint correto da API
  private debugMode = true; // Altere para 'false' quando quiser reativar o login

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.apiUrl, { username, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token); // 🔥 Armazena o token JWT no localStorage
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.debugMode || !!localStorage.getItem('token'); // Verifica se o token está salvo
  }

  getToken(): string | null {
    return localStorage.getItem('token'); // Obtém o token para requisições autenticadas
  }
}
