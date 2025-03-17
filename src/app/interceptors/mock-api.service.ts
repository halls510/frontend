import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class MockApiInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`Interceptando requisição: ${req.url}`);

    if (req.url.includes('/api/users')) {
      return of(new HttpResponse({
        status: 200,
        body: [
          { id: 1, name: 'Usuário Moc 1', email: 'moc1@email.com' },
          { id: 2, name: 'Usuário Moc 2', email: 'moc2@email.com' }
        ]
      }));
    }

    if (req.url.includes('/api/products')) {
      return of(new HttpResponse({
        status: 200,
        body: [
          { id: 1, name: 'Produto Moc 1', price: 100 },
          { id: 2, name: 'Produto Moc 2', price: 200 }
        ]
      }));
    }

    return next.handle(req); // Se não for um endpoint mocado, segue normalmente
  }
}