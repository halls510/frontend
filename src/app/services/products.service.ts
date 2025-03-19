import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs'; // ✅ Adicionando "of"
import { catchError } from 'rxjs/operators'; // ✅ Importando "catchError"
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { CategoriesResponse } from '../models/category.model';
import { ProductsResponse, Product, ProductRequest, ProductResponse } from '../models/product.model';

const API_URL = '/api/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<ProductsResponse> {  
    return this.http.get<ProductsResponse>(API_URL);
  }

  getCategories(): Observable<CategoriesResponse> {
    return this.http.get<CategoriesResponse>(`${API_URL}/categories`);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(`${API_URL}/${id}`);
  }

  createProduct(product: any): Observable<any> {
    return this.http.post(API_URL, product);
  }

  updateProduct(id: number, product: ProductRequest): Observable<ProductResponse> {
    return this.http.put<ProductResponse>(`${API_URL}/${id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`);
  }
}