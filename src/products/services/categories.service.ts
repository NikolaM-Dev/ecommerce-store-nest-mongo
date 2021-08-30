import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Category } from '../entities/category.entity';
// import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';
// import { CategoriesController }  from '../controllers/brands.controller.ts'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  findMany() {
    return this.categoryModel.find().exec();
  }

  async findById(id: string) {
    const category = await this.categoryModel.findById(id).exec();

    if (!category)
      throw new NotFoundException(`Category with id ${id} not found`);

    return category;
  }

  // create(payload: CreateCategoryDto) {
  //   const id = ++this.counterId;
  //   const newCategory = { id, ...payload };
  //   this.categories.push(newCategory);

  //   return newCategory;
  // }

  // update(id: number, payload: UpdateCategoryDto) {
  //   const category = this.findById(id);
  //   const index = this.categories.findIndex((category) => category.id === id);
  //   this.categories[index] = { ...category, ...payload };

  //   return this.categories[index];
  // }

  // delete(id: number) {
  //   const category = this.findById(id);
  //   this.categories = this.categories.filter((category) => category.id !== id);

  //   return category;
  // }
}
