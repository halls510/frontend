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
  filteredProducts: Product[] = []; // ✅ Lista filtrada por categoria
  categories: string[] = []; // ✅ Lista de categorias para o filtro
  selectedCategory: string = 'Todos'; // ✅ Categoria atualmente selecionada

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.productsService.getCategories().subscribe((response: string[]) => {
      this.categories = ['Todos', ...response.data]; // Adiciona a opção "Todos"
    });
  }

  loadProducts(): void {    
    this.productsService.getProducts().subscribe(response => { 
     console.log('Resposta da API:', response);  // Para depuração
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

filterByCategory(category: string): void {
  this.selectedCategory = category;
  if (category === 'Todos') {
    this.filteredProducts = this.products;
  } else {
    this.filteredProducts = this.products.filter(
      product => product.category === this.selectedCategory // ✅ Agora 'category' existe
    );
  }
}


  applyFilter(): void {
    if (this.selectedCategory === 'Todos') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(
        product => product.category === this.selectedCategory
      );
    }
  }
  
  addToCart(product: Product): void {
    console.log(`✅ Produto adicionado ao carrinho: ${product.name}`);
    alert(`${product.name} foi adicionado ao carrinho!`);
  }
}