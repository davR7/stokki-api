import { StockDocument } from "@/infra/database/models/stock";
import { Stock } from "./stock.entity";

export class StockMapper {
  static toDomain(input: StockDocument): Stock {
    return Stock.restore({
      id: input._id.toString(),
      quantity: input.quantity,
      minimumQuantity: input.minimumQuantity,
      productId: input.productId,
      createdAt: input.createdAt,
    });
  }
}
