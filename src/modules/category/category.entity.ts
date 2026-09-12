type CategoryProps = {
  name: string;
};

type PersistedCategoryProps = CategoryProps & {
  id: string;
  createdAt: Date;
};

export class Category {
  private constructor(private props: PersistedCategoryProps) {}

  static create(props: CategoryProps) {
    return new Category({
      ...props,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    });
  }

  static restore(props: PersistedCategoryProps) {
    return new Category(props);
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}
