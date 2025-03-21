import { Injectable } from '@angular/core';
import { GetSaleResult } from 'src/app/models/sale.model';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor() { }


  getSaleById(id: number): Observable<GetSaleResult> {
  	return this.http.get<GetSaleResult>(`${this.apiUrl}/${id}`);
   }

}
