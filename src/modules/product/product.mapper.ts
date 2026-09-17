import { ProductDocument } from "@/infra/database/models/product";
import { ProductWithStock } from "@/infra/repositories/ports/ProductWithStock";
import { ProductWithStockDoc } from "@/infra/repositories/ports/ProductWithStockDoc";
import { Stock } from "../stock/stock.entity";
import { ProductOutputDto, ProductWithStockOutputDto } from "./product.dto";
import { Product } from "./product.entity";

export class ProductMapper {
  static toPersistence(input: Product): ProductDocument {
    return {
      _id: input.id,
      name: input.name,
      sku: input.sku,
      description: input.description,
      price: input.price,
      status: input.status,
      categoryId: input.categoryId,
      createdAt: input.createdAt,
    };
  }

  static toDomain(input: ProductDocument): Product {
    return Product.restore({
      id: input._id,
      name: input.name,
      sku: input.sku,
      description: input.description,
      price: input.price,
      status: input.status,
      categoryId: input.categoryId,
      createdAt: input.createdAt,
    });
  }

  static toUseCase(input: Product): ProductOutputDto {
    return {
      id: input.id,
      name: input.name,
      sku: input.sku,
      description: input.description,
      price: input.price,
      status: input.status,
      categoryId: input.categoryId,
      createdAt: input.createdAt,
    };
  }

  static toUseCaseProductWithStock(input: ProductWithStock): ProductWithStockOutputDto {
    return {
      product: {
        id: input.product.id,
        name: input.product.name,
        sku: input.product.sku,
        status: input.product.status,
      },
      stock: {
        id: input.stock.id,
        quantity: input.stock.quantity,
        minimumQuantity: input.stock.minimumQuantity,
      },
    };
  }

  static toDomainProductWithStock(input: ProductWithStockDoc): ProductWithStock {
    const product = Product.restore({
      id: input._id,
      name: input.name,
      sku: input.sku,
      description: input.description,
      price: input.price,
      status: input.status,
      categoryId: input.categoryId,
      createdAt: input.createdAt,
    });

    const stock = Stock.restore({
      id: input.stock._id,
      quantity: input.stock.quantity,
      minimumQuantity: input.stock.minimumQuantity,
      productId: input.stock.productId,
      createdAt: input.stock.createdAt,
    });

    return {
      product,
      stock,
    };
  }
}
