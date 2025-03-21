import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesListComponent } from './sales-list/sales-list.component';
import { SaleDetailsComponent } from './sale-details/sale-details.component';
import { SalesManagementRoutingModule } from './sales-management-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SaleDetailsDrawerComponent } from './sale-details-drawer/sale-details-drawer.component';

@NgModule({
  declarations: [
    SalesListComponent,
    SaleDetailsComponent,
    SaleDetailsDrawerComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SalesManagementRoutingModule
  ]
})
export class SalesManagementModule { }



/*
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesManagementRoutingModule } from './sales-management-routing.module';
import { SalesListComponent } from './sales-list/sales-list.component';
import { SaleDetailsComponent } from './sale-details/sale-details.component';


@NgModule({
  declarations: [
    SalesListComponent,
    SaleDetailsComponent
  ],
  imports: [
    CommonModule,
    SalesManagementRoutingModule
  ]
})
export class SalesManagementModule { }

*/