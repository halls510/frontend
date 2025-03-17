import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'https://localhost:8081/api/carts';

@Injectable({
  providedIn: 'root'
})
export class CartsService {
  constructor(private http: HttpClient) {}

  getCarts(): Observable<any> {
    return this.http.get(API_URL);
  }

  getCartById(id: number): Observable<any> {
    return this.http.get(`${API_URL}/${id}`);
  }

  addToCart(cartItem: any): Observable<any> {
    return this.http.post(API_URL, cartItem);
  }

  removeFromCart(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`);
  }

  checkoutCart(id: number): Observable<any> {
    return this.http.post(`${API_URL}/${id}/checkout`, {});
  }
}