export interface StockInputDto {
  quantity: number;
  minimumQuantity: number;
  productId?: string;
}

export interface StockOutputDto extends StockInputDto {
  id: string;
}
