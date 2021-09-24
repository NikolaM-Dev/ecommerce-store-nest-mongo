import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findMany() {
    return await this.categoryRepository.find();
  }

  async findById(id: number) {
    const category = await this.categoryRepository.findOne(id, {
      relations: ['products'],
    });

    if (!category)
      throw new NotFoundException(`Category with id ${id} not found`);

    return category;
  }

  async create(payload: CreateCategoryDto) {
    const newCategory = this.categoryRepository.create(payload);

    return await this.categoryRepository.save(newCategory);
  }

  async update(id: number, payload: UpdateCategoryDto) {
    const category = await this.findById(id);
    this.categoryRepository.merge(category, payload);

    return await this.categoryRepository.save(category);
  }

  async remove(id: number) {
    const category = await this.findById(id);
    await this.categoryRepository.delete(id);

    return category;
  }
}
