import { StockDocument } from "@/infra/database/models/stock";
import { StockOutputDto } from "./stock.dto";
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

  static toUseCase(input: Stock): StockOutputDto {
    return {
      id: input.id,
      quantity: input.quantity,
      minimumQuantity: input.minimumQuantity,
      productId: input.productId,
    };
  }
}
