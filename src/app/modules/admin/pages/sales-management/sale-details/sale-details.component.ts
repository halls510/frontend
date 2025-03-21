import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalesService } from '../sales.service';
import { GetSaleResult } from 'src/app/models/sale.model';

@Component({
  selector: 'app-sale-details',
  templateUrl: './sale-details.component.html'
})
export class SaleDetailsComponent implements OnInit {
  sale!: GetSaleResult;

  constructor(
    private route: ActivatedRoute,
    private salesService: SalesService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.salesService.getSaleById(id).subscribe((data) => {
      this.sale = data;
    });
  }
}






/*
import { Component } from '@angular/core';

@Component({
  selector: 'app-sale-details',
  templateUrl: './sale-details.component.html',
  styleUrls: ['./sale-details.component.scss']
})
export class SaleDetailsComponent {

}
*/