import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CartResponse,
  CartStatus,
  CartItem
} from 'src/app/models/cart.model';
import { Product as ProductModel } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.scss']
})
export class CartsComponent implements OnInit {
  activeCart: CartResponse | null = null;
  productsMap = new Map<number, ProductModel>();
  userId: number | null = null;
  isLoading = false;
  error: string | null = null;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    if (!this.userId) {
      this.error = 'Usuário não autenticado.';
      return;
    }
    this.loadProductsAndCart();
  }

  loadProductsAndCart(): void {
    this.isLoading = true;

    this.http.get<{ data: ProductModel[] }>('/api/products').subscribe({
      next: (res) => {
        res.data.forEach(p => this.productsMap.set(p.id, p));
        this.loadActiveCart();
      },
      error: () => {
        this.error = 'Erro ao buscar produtos.';
        this.isLoading = false;
      }
    });
  }

  loadActiveCart(): void {
    if (!this.userId) return;

    this.http.get<{ data: CartResponse[] }>(`/api/carts?userId=${this.userId}`).subscribe({
      next: (res) => {
        const carts = res.data;
        const active = carts.find(c => c.status === CartStatus.Active)
          || carts.reverse().find(c => !c.status || c.status === CartStatus.Active);
        this.activeCart = active || null;
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Erro ao buscar o carrinho.';
        this.isLoading = false;
      }
    });
  }

  getProductName(productId: number): string {
    return this.productsMap.get(productId)?.title || `Produto #${productId}`;
  }

  onQuantityChange(item: CartItem): void {
    if (!this.activeCart || !this.activeCart.products) return;

    if (item.quantity > 20) {
      alert('❌ Máximo permitido: 20 unidades.');
      item.quantity = 20;
    } else if (item.quantity < 1) {
      item.quantity = 1;
    }

    this.updateCart(this.activeCart.products);
    this.loadProductsAndCart();
  }

  removeItem(productId: number): void {
    if (!this.activeCart || !this.activeCart.products) return;

    const remainingItems = this.activeCart.products.filter(p => p.productId !== productId);

    if (remainingItems.length === 0) {
      alert('O carrinho não pode ficar vazio.');
      return;
    }

    this.updateCart(remainingItems);
    this.loadProductsAndCart();
  }

  updateCart(updatedItems: CartItem[]): void {
    const updatedProducts: CartItem[] = updatedItems.map(p => {
      const product = this.productsMap.get(p.productId);
      const unitPrice = product?.price ?? p.unitPrice;
      return {
        productId: p.productId,
        quantity: p.quantity,
        unitPrice,
        discount: 0,
        total: unitPrice * p.quantity
      };
    });

    const updateRequest = {
      userId: this.activeCart!.userId,
      date: new Date().toISOString(),
      products: updatedProducts
    };

    this.http.put<CartResponse>(`/api/carts/${this.activeCart!.id}`, updateRequest).subscribe({
      next: (updatedCart) => {
        this.activeCart = updatedCart;
        console.log('✅ Carrinho atualizado');
      },
      error: (err) => {
        console.error('Erro ao atualizar carrinho:', err);
        alert('Erro ao atualizar carrinho.');
      }
    });
  }

  checkout(): void {
    if (!this.activeCart) return;

    this.http.post(`/api/carts/${this.activeCart.id}/checkout`, null).subscribe({
      next: () => {
        alert('✅ Checkout finalizado com sucesso!');
        this.activeCart = null;
      },
      error: () => {
        alert('Erro ao realizar checkout.');
      }
    });
  }
}

