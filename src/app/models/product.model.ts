export interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export interface ProductRequest {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export interface ProductsResponse {
  data: Product[];   // Lista de produtos
  success: boolean;  // Indica se a requisição foi bem-sucedida
  message: string;   // Mensagem informativa
  errors: string[];  // Lista de erros, se houver
}

export interface ProductResponse {
  data: Product;   // Lista de produtos
  success: boolean;  // Indica se a requisição foi bem-sucedida
  message: string;   // Mensagem informativa
  errors: string[];  // Lista de erros, se houver
}
