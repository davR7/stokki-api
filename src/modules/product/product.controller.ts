import { Request, Response } from "express";
import { ProductUseCase } from "./product.use-case";

export class ProductController {
  constructor(private productUseCase: ProductUseCase) {}

  async handleCreate(req: Request, res: Response) {
    const output = await this.productUseCase.create(req.body);
    return res.status(201).json(output);
  }
}
