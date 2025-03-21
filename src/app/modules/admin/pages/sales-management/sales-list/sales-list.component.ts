// sales-list.component.ts
import { Component, OnInit } from '@angular/core';
import { SalesService } from '../sales.service';
import { GetSaleResult } from 'src/app/models/sale.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html'
})
export class SalesListComponent implements OnInit {
  sales: GetSaleResult[] = [];
  selectedSale?: GetSaleResult;
  drawerVisible = false;

  constructor(private salesService: SalesService, private router: Router) {}

  ngOnInit(): void {
    this.salesService.getAllSales().subscribe(data => this.sales = data);
  }




viewDetails(sale: GetSaleResult): void {
  this.selectedSale = sale;
  this.drawerVisible = true;
}

closeDrawer(): void {
  this.drawerVisible = false;
}


/*
  viewDetails(id: number) {
    this.router.navigate([id]);
  }
  */

  cancelSale(id: number) {
    if (confirm('Deseja cancelar esta venda?')) {
      this.salesService.cancelSale(id).subscribe(() => {
        this.sales = this.sales.filter(s => s.saleId !== id); // ou recarrega
      });
    }
  }
}







/*
import { Component } from '@angular/core';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss']
})
export class SalesListComponent {

}
*/