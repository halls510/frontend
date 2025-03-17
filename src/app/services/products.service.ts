import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs'; // ✅ Adicionando "of"
import { catchError } from 'rxjs/operators'; // ✅ Importando "catchError"

const API_URL = 'http://localhost:8080/api/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
   console.log('Chamando getProducts()...'); 
       return this.http.get(API_URL).pipe(
      catchError(error => {
        console.error('Erro ao buscar produtos, usando dados mocados', error);
        return of([
          { id: 1, name: 'Produto Mock 1', price: 100 },
          { id: 2, name: 'Produto Mock 2', price: 200 }
        ]); // Retorna produtos mocados caso a API falhe
      })
    );
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