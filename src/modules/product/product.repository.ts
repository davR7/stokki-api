import { Pagination } from "@/infra/repositories/ports/Pagination";
import { ProductList } from "@/infra/repositories/ports/ProductList";
import { Product } from "./product.entity";

export interface ProductRepository {
  create(input: Product): Promise<Product>;
  findBySku(sku: string): Promise<Product | null>;
  findAll(input: Pagination): Promise<ProductList>;
}
