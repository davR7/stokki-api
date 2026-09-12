type StockProps = {
  quantity: number;
  minimumQuantity: number;
  productId: string;
};

type PersistedStockProps = StockProps & {
  id: string;
  createdAt: Date;
};

export class Stock {
  private constructor(private props: PersistedStockProps) {}

  static create(props: StockProps) {
    return new Stock({
      ...props,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    });
  }

  static restore(props: PersistedStockProps) {
    return new Stock(props);
  }

  get id(): string {
    return this.props.id;
  }

  get quantity(): number {
    return this.props.quantity;
  }

  get minimumQuantity(): number {
    return this.props.minimumQuantity;
  }

  get productId(): string {
    return this.props.productId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}
