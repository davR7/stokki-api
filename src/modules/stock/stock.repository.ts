import { Stock } from "./stock.entity";

export interface StockRepository {
  create(stock: Stock): Promise<Stock>;
}
