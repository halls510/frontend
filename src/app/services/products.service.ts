import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs'; // ✅ Adicionando "of"
import { catchError } from 'rxjs/operators'; // ✅ Importando "catchError"

const API_URL = '/api/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {  
    return this.http.get(API_URL);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${API_URL}/categories`);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(`${API_URL}/${id}`);
  }

  createProduct(product: any): Observable<any> {
    return this.http.post(API_URL, product);
  }

  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put(`${API_URL}/${id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`);
  }
}