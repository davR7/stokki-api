import { Product } from "@/modules/product/product.entity";
import { Stock } from "@/modules/stock/stock.entity";

export interface ProductWithStock {
  product: Product;
  stock: Stock;
}
