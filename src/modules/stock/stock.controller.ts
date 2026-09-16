import { Request, Response } from "express";
import { StockUseCase } from "./stock.use-case";

export class StockController {
  constructor(private stockUseCase: StockUseCase) {}

  async handleUpdate(req: Request<{ productId: string }>, res: Response) {
    const { productId } = req.params;

    const output = await this.stockUseCase.update(productId, req.body);

    return res.json(output);
  }
}
