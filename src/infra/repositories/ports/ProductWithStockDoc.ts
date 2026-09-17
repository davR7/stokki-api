import { ProductDocument } from "@/infra/database/models/product";
import { StockDocument } from "@/infra/database/models/stock";

export interface ProductWithStockDoc extends ProductDocument {
  stock: StockDocument;
}
