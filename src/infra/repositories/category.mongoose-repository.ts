import { Category } from "@/modules/category/category.entity";
import { CategoryRepository } from "@/modules/category/category.repository";
import { CategoryModel } from "../database/models/category";

export class CategoryMongooseRepository implements CategoryRepository {
  async findById(id: string): Promise<Category | null> {
    const category = await CategoryModel.findById(id);

    if (!category) return null;

    return Category.restore({
      id: category.id,
      name: category.name,
      createdAt: category.createdAt,
    });
  }
}
