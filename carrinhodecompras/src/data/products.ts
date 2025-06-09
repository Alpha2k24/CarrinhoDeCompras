// src/api/productsAPI.ts
import axios from 'axios';

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  inCart?: boolean;
};

export async function fetchProducts(): Promise<Product[]> {
  const response = await axios.get('https://fakestoreapi.com/products');
  return response.data.map((product: Product) => ({
    ...product,
    inCart: false,
  }));
}
