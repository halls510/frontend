import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ProductListComponent } from '../product-list/product-list.component';

@NgModule({
  declarations: [
    HomeComponent,
    ProductListComponent // Registrando o componente de lista de produtos
  ],
  imports: [
    CommonModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
