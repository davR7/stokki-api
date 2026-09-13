import { CategoryMongooseRepository } from "@/infra/repositories/category.mongoose-repository";
import { ProductMongooseRepository } from "@/infra/repositories/product.mongoose-repository";
import { StockMongooseRepository } from "@/infra/repositories/stock.mongoose-repository";
import { ProductController } from "@/modules/product/product.controller";
import { ProductUseCase } from "@/modules/product/product.use-case";

export function makeProductFactory() {
  const productRepository = new ProductMongooseRepository();
  const categoryRepository = new CategoryMongooseRepository();
  const stockRepository = new StockMongooseRepository();
  const productUseCase = new ProductUseCase(productRepository, categoryRepository, stockRepository);
  return new ProductController(productUseCase);
}
