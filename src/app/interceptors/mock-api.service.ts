import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MOCK_USERS, MOCK_PRODUCTS, MOCK_CATEGORIES } from '../mocks/mock-data';

@Injectable()
export class MockApiInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`Interceptando requisição: ${req.url}`);

    let responseBody: any;

    switch (true) {
      case req.url.includes('/api/users'):
        responseBody = MOCK_USERS;
        break;
      
      case req.url.includes('/api/products'):
        responseBody = MOCK_PRODUCTS;
        break;

      case req.url.includes('/api/products/categories'):
         responseBody = MOCK_CATEGORIES;
        break;

      default:
        return next.handle(req); // Se não for um endpoint mocado, segue normalmente
    }

    return of(new HttpResponse({ status: 200, body: responseBody }));
  }
}
