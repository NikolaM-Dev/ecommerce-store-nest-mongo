import { Injectable, NotFoundException } from '@nestjs/common';

import { Category } from 'src/entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/dtos/categories.dto';

@Injectable()
export class CategoriesService {
  private counterId = 0;
  private categories: Array<Category> = [
    {
      id: 1,
      name: 'Comida',
    },
  ];

  findAll() {
    return this.categories;
  }

  findById(id: number) {
    const category = this.categories.find((category) => category.id === id);

    if (!category)
      throw new NotFoundException(`Category with id ${id} not found`);

    return category;
  }

  create(payload: CreateCategoryDto) {
    const id = ++this.counterId;
    const newCategory = { id, ...payload };
    this.categories.push(newCategory);

    return newCategory;
  }

  update(id: number, payload: UpdateCategoryDto) {
    const category = this.findById(id);
    const index = this.categories.findIndex((category) => category.id === id);
    this.categories[index] = { ...category, ...payload };

    return this.categories[index];
  }

  delete(id: number) {
    const category = this.findById(id);
    this.categories = this.categories.filter((category) => category.id !== id);

    return category;
  }
}
