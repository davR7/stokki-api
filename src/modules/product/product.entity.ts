import { ProductStatus } from "./product-status.enum";

type ProductProps = {
  name: string;
  sku: string;
  description: string;
  price: number;
  status: ProductStatus;
  categoryId: string;
};

type PersistedProductProps = ProductProps & {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
};

export class Product {
  private constructor(private props: PersistedProductProps) {}

  static create(props: ProductProps) {
    return new Product({
      ...props,
      id: crypto.randomUUID(),
      status: ProductStatus.ACTIVE,
      createdAt: new Date(),
    });
  }

  static restore(props: PersistedProductProps) {
    return new Product(props);
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get sku(): string {
    return this.props.sku;
  }

  get description(): string {
    return this.props.description;
  }

  get price(): number {
    return this.props.price;
  }

  get status(): ProductStatus {
    return this.props.status;
  }

  get categoryId(): string {
    return this.props.categoryId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}
