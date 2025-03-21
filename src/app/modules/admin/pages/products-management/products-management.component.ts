import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product, ProductsResponse } from 'src/app/models/product.model';
import { CategoriesResponse } from 'src/app/models/category.model';
import { HttpClient } from '@angular/common/http';

@Component({ // ✅ Adicione este decorador se estiver faltando
  selector: 'app-products-management',
  templateUrl: './products-management.component.html',
  styleUrls: ['./products-management.component.scss']
})
export class ProductsManagementComponent implements OnInit {
  searchQuery: string = '';
  selectedFile: File | null = null;
  products: Product[] = [];
  categories: string[] = [];
  selectedCategory: string = 'Todos';
  newProduct: Product = { id: 0, title: '', price: 0, category: '', image: '', description: '', rating: { rate: 0, count: 0 } };
  isEditing: boolean = false;
  showModal: boolean = false;
  imageFile?: File;
  isNewCategory: boolean = false; 
  newCategory: string = ''; 

  constructor(private productsService: ProductsService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.productsService.getCategories().subscribe((response: CategoriesResponse) => {
      if (response && response.data) {
        this.categories = ['Todos', ...response.data];
      } else {
        console.warn('Nenhuma categoria encontrada.');
      }
    }, error => {
      console.error('Erro ao carregar categorias:', error);
    });
  }

  loadProducts(): void {
    this.productsService.getProducts().subscribe((response: ProductsResponse) => {
      if (response && response.data) {
        this.products = response.data.map((product: Product) => ({
          ...product,
          imageUrl: product.image || 'assets/default-product.jpg'
        }));
      } else {
        console.warn('Nenhum produto encontrado.');
      }
    }, error => {
      console.error('Erro ao carregar produtos:', error);
    });
  }

  openCreateModal(): void {
    this.newProduct = { id: 0, title: '', price: 0, category: '', image: '', description: '', rating: { rate: 0, count: 0 } };
    this.isEditing = false;
    this.showModal = true;
  }

  closeCreateModal(): void {
    this.showModal = false;
    this.isNewCategory = false;
    this.newCategory = '';
  }

  filteredProducts(): Product[] {
    if (this.selectedCategory === 'Todos') {
      return this.products.filter(product =>
        product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    return this.products.filter(product =>
      product.category === this.selectedCategory &&
      product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  checkNewCategory(): void {
    this.isNewCategory = this.newProduct.category === 'other';
  }

/*
  // Método chamado ao selecionar um arquivo no <input type="file">
  handleImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]; // Guarda o arquivo para upload posterior
    }
  }
  */

  handleImageUpload(event: Event): void {
  const input = event.target as HTMLInputElement;

  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.newProduct.image = reader.result as string;
    };

    reader.readAsDataURL(file);
  }
}

  
  saveProduct(): void {
    if (this.isNewCategory && this.newCategory.trim() !== '') {
      this.newProduct.category = this.newCategory;
      this.categories.push(this.newCategory);
    }

    if (this.isEditing) {
      this.productsService.updateProduct(this.newProduct.id, this.newProduct).subscribe(() => {
        this.loadProducts();
        this.closeCreateModal();
        alert('Produto atualizado com sucesso!');
      }, error => {
        console.error('Erro ao atualizar produto:', error);
      });
    } else {
      this.productsService.createProduct(this.newProduct).subscribe(() => {
        this.loadProducts();
        this.closeCreateModal();
        alert('Produto adicionado com sucesso!');
      }, error => {
        console.error('Erro ao adicionar produto:', error);
      });
    }
  }

    // Método para fazer upload da imagem para o servidor e obter a URL do MinIO
    async uploadImageAndSaveProduct(): Promise<void> {
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('file', this.selectedFile);
  
        try {
          const response = await this.http.post<{ url: string }>(
            '/api/upload', formData
          ).toPromise();
  
          if (!response || !response.url) {
            throw new Error('Erro ao obter a URL da imagem');
          }
  
          this.newProduct.image = response.url; // Define a URL da imagem vinda do MinIO
        } catch (error) {
          console.error('Erro ao enviar a imagem:', error);
          return;
        }
      }
  
      this.saveProduct(); // Salva o produto após obter a URL da imagem
    }


  editProduct(product: Product): void {
    this.newProduct = { ...product };
    this.isEditing = true;
    this.showModal = true;
  }

  deleteProduct(productId: number): void {
    this.productsService.deleteProduct(productId).subscribe(() => {
      this.loadProducts();
      alert(`Produto ${productId} excluído!`);
    }, error => {
      console.error('Erro ao excluir produto:', error);
    });
  }
}









/*

import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product, ProductsResponse } from 'src/app/models/product.model';
import { CategoriesResponse } from 'src/app/models/category.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products-management',
  templateUrl: './products-management.component.html',
  styleUrls: ['./products-management.component.scss']
})
export class ProductsManagementComponent implements OnInit {
  searchQuery: string = '';
  products: Product[] = [];
  categories: string[] = [];
  selectedCategory: string = 'Todos';
  newProduct: Product = { id: 0, title: '', price: 0, category: '', image: '', description: '', rating: { rate: 0, count: 0 } };
  isEditing: boolean = false;
  showModal: boolean = false;
  imageFile?: File;

  constructor(private productsService: ProductsService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.productsService.getCategories().subscribe((response: CategoriesResponse) => {
      console.log('Resposta da API GET CATEGORIES:', response);
      if (response && response.data) {
        this.categories = ['Todos', ...response.data];
      } else {
        console.warn('Nenhuma categoria encontrada.');
      }
    }, error => {
      console.error('Erro ao carregar categorias:', error);
    });
  }

  loadProducts(): void {
    this.productsService.getProducts().subscribe((response: ProductsResponse) => {
      console.log('Resposta da API GET PRODUCTS:', response);
      if (response && response.data) {
        this.products = response.data.map((product: Product) => ({
          ...product,
          imageUrl: product.image || 'assets/default-product.jpg'
        }));
      } else {
        console.warn('Nenhum produto encontrado.');
      }
    }, error => {
      console.error('Erro ao carregar produtos:', error);
    });
  }

  filteredProducts(): Product[] {
    if (this.selectedCategory === 'Todos') {
      return this.products.filter(product =>
        product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    return this.products.filter(product =>
      product.category === this.selectedCategory &&
      product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  openCreateModal() {
    this.newProduct = { id: 0, title: '', price: 0, category: '', image: '', description: '', rating: { rate: 0, count: 0 } };
    this.isEditing = false;
    this.showModal = true;
  }

  closeCreateModal() {
    this.showModal = false;
  }

  handleImageUpload(event: any) {
    this.imageFile = event.target.files[0];
  }

  uploadImageAndSaveProduct() {
    if (!this.imageFile) {
      this.saveProduct();
      return;
    }

    const formData = new FormData();
    formData.append('file', this.imageFile);

    this.http.post<{ url: string }>('/api/upload', formData).subscribe(response => {
      this.newProduct.image = response.url;
      this.saveProduct();
    }, error => {
      console.error('Erro ao fazer upload da imagem:', error);
    });
  }

  saveProduct() {
    if (this.isEditing) {
      this.productsService.updateProduct(this.newProduct.id, this.newProduct).subscribe(response => {
        this.loadProducts();
        this.closeCreateModal();
        alert('Produto atualizado com sucesso!');
      }, error => {
        console.error('Erro ao atualizar produto:', error);
      });
    } else {
      this.productsService.createProduct(this.newProduct).subscribe(response => {
        this.loadProducts();
        this.closeCreateModal();
        alert('Produto adicionado com sucesso!');
      }, error => {
        console.error('Erro ao adicionar produto:', error);
      });
    }
  }

  editProduct(product: Product) {
    this.newProduct = { ...product };
    this.isEditing = true;
    this.showModal = true;
  }

  deleteProduct(productId: number) {
    this.productsService.deleteProduct(productId).subscribe(response => {
      this.loadProducts();
      alert(`Produto ${productId} excluído!`);
    }, error => {
      console.error('Erro ao excluir produto:', error);
    });
  }
}
*/