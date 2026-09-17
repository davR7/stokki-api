import { ConflictError } from "@/shared/error/conflict.error";
import { NotFoundError } from "@/shared/error/not-found.error";
import { CategoryRepository } from "../category/category.repository";
import { Stock } from "../stock/stock.entity";
import { StockRepository } from "../stock/stock.repository";
import {
  ListProductInputDto,
  ListProductOutputDto,
  ProductInputDto,
  ProductOutputDto,
  ProductWithStockOutputDto,
} from "./product.dto";
import { Product } from "./product.entity";
import { ProductMapper } from "./product.mapper";
import { ProductRepository } from "./product.repository";

export class ProductUseCase {
  constructor(
    private productRepository: ProductRepository,
    private categoryRepository: CategoryRepository,
    private stockRepository: StockRepository,
  ) {}

  async create(input: ProductInputDto): Promise<ProductOutputDto> {
    const category = await this.categoryRepository.findById(input.categoryId);

    if (!category) {
      throw new NotFoundError("Categoria não encontrada", "CATEGORY_ERR_NOT_FOUND");
    }

    const product = await this.productRepository.findBySku(input.sku);

    if (product) {
      throw new ConflictError("Produto já cadastrado", "PRODUCT_ERR_CONFLICT");
    }

    const { stock, ...rest } = input;

    const output = await this.productRepository.create(Product.create(rest));

    await this.stockRepository.create(
      Stock.create({
        quantity: stock.quantity,
        minimumQuantity: stock.minimumQuantity,
        productId: output.id,
      }),
    );

    return ProductMapper.toUseCase(output);
  }

  async list(input: ListProductInputDto): Promise<ListProductOutputDto> {
    const output = await this.productRepository.findAll(input);

    return {
      products: output.products.map((p) => ProductMapper.toUseCase(p)),
      page: output.page,
      limit: output.limit,
      total: output.total,
    };
  }

  async listLowStock(): Promise<ProductWithStockOutputDto[]> {
    const output = await this.productRepository.findLowStock();

    return output.map((product) => ProductMapper.toUseCaseProductWithStock(product));
  }
}
