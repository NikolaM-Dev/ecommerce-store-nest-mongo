import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';

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

  create(payload: CreateCategoryDto) {
    const newCategory = new this.categoryModel(payload);

    return newCategory.save();
  }

  async update(id: string, payload: UpdateCategoryDto) {
    const category = await this.categoryModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();

    if (!category)
      throw new NotFoundException(`Category with id ${id} not found`);

    return category;
  }

  remove(id: string) {
    this.findById(id);

    return this.categoryModel.findByIdAndDelete(id);
  }
}
