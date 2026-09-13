import { Product } from "./product.entity";

export interface ProductRepository {
  create(input: Product): Promise<Product>;
  findBySku(sku: string): Promise<Product | null>;
}
