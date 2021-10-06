import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dto';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

  async findMany() {
    return await this.brandRepository.find();
  }

  async findById(id: number) {
    const brand = await this.brandRepository.findOne(id, {
      relations: ['products'],
    });

    if (!brand)
      throw new NotFoundException(`Brand with id ${id} not found in database`);

    return brand;
  }

  async create(payload: CreateBrandDto) {
    const newBrand = this.brandRepository.create(payload);

    return await this.brandRepository.save(newBrand);
  }

  async update(id: number, payload: UpdateBrandDto) {
    const brand = await this.findById(id);

    this.brandRepository.merge(brand, payload);

    return await this.brandRepository.save(brand);
  }

  async remove(id: number) {
    const brand = await this.findById(id);

    await this.brandRepository.delete(id);

    return brand;
  }
}
