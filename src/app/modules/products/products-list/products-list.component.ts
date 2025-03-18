import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product.model'; // ✅ Importando o modelo

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products: Product[] = []; // ✅ Usando a interface Product

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {    
    this.productsService.getProducts().subscribe(response => { 
      if (response && response.data) { // 🔥 Verifica se 'response' e 'response.data' existem
        this.products = response.data.map((product: Product) => ({
          ...product,
          imageUrl: product.imageUrl || 'assets/default-product.jpg'
        }));
      } else {
        console.warn('⚠️ Nenhum produto encontrado.');
      }
    }, error => {
      console.error('❌ Erro ao carregar produtos:', error);
    });
  }
  
  addToCart(product: Product): void {
    console.log(`✅ Produto adicionado ao carrinho: ${product.name}`);
    alert(`${product.name} foi adicionado ao carrinho!`);
  }
}