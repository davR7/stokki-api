import { Pagination } from "@/infra/repositories/ports/Pagination";
import { StockOutputDto } from "../stock/stock.dto";
import { ProductStatus } from "./product-status.enum";

export interface ProductInputDto {
  name: string;
  sku: string;
  description: string;
  price: number;
  categoryId: string;
  stock: {
    quantity: number;
    minimumQuantity: number;
  };
}

export interface ProductOutputDto extends Omit<ProductInputDto, "stock"> {
  id: string;
  status: ProductStatus;
  createdAt: Date;
}

export type ListProductInputDto = Pagination;

export interface ListProductOutputDto {
  products: ProductOutputDto[];
  page: number;
  limit: number;
  total: number;
}

export interface ProductWithStockOutputDto {
  product: {
    id: string;
    name: string;
    sku: string;
    status: ProductStatus;
  };
  stock: {
    id: string;
    quantity: number;
    minimumQuantity: number;
  };
}
