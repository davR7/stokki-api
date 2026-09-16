import { Stock } from "./stock.entity";

export interface StockRepository {
  create(input: Stock): Promise<Stock>;
  update(productId: string, input: Partial<Stock>): Promise<Stock | null>;
}
