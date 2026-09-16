import { NotFoundError } from "@/shared/error/not-found.error";
import { StockInputDto, StockOutputDto } from "./stock.dto";
import { StockMapper } from "./stock.mapper";
import { StockRepository } from "./stock.repository";

export class StockUseCase {
  constructor(private stockRepository: StockRepository) {}

  async update(productId: string, input: StockInputDto): Promise<StockOutputDto> {
    const stock = await this.stockRepository.update(productId, {
      quantity: input.quantity,
      minimumQuantity: input.minimumQuantity,
    });

    if (!stock) {
      throw new NotFoundError("Estoque do produto não encontrado", "STOCK_ERR_NOT_FOUND");
    }

    return StockMapper.toUseCase(stock);
  }
}
