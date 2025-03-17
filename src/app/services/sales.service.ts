import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'https://localhost:8081/api/sales';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  constructor(private http: HttpClient) {}

  getSales(): Observable<any> {
    return this.http.get(API_URL);
  }

  getSaleById(id: number): Observable<any> {
    return this.http.get(`${API_URL}/${id}`);
  }

  updateSale(id: number, sale: any): Observable<any> {
    return this.http.put(`${API_URL}/${id}`, sale);
  }

  cancelSale(id: number): Observable<any> {
    return this.http.patch(`${API_URL}/${id}/cancel`, {});
  }
}