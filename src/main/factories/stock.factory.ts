import { StockMongooseRepository } from "@/infra/repositories/stock.mongoose-repository";
import { StockController } from "@/modules/stock/stock.controller";
import { StockUseCase } from "@/modules/stock/stock.use-case";

export function makeStockFactory() {
  const stockRepository = new StockMongooseRepository();
  const stockUseCase = new StockUseCase(stockRepository);
  return new StockController(stockUseCase);
}
