import { Stock } from "@/modules/stock/stock.entity";
import { StockMapper } from "@/modules/stock/stock.mapper";
import { StockRepository } from "@/modules/stock/stock.repository";
import { StockModel } from "../database/models/stock";

export class StockMongooseRepository implements StockRepository {
  async create(input: Stock): Promise<Stock> {
    const stock = await StockModel.create({
      _id: input.id,
      quantity: input.quantity,
      minimumQuantity: input.minimumQuantity,
      productId: input.productId,
    });

    return StockMapper.toDomain(stock);
  }
}
