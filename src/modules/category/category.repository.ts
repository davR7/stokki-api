import { Category } from "./category.entity";

export interface CategoryRepository {
  findById(id: string): Promise<Category | null>;
}
