import { Product } from "@/modules/product/product.entity";

export interface ProductList {
  products: Product[];
  page: number;
  limit: number;
  total: number;
}
