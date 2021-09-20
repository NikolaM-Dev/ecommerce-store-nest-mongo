import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findMany() {
    return await this.productRepository.find();
  }

  async findById(id: number) {
    const product = await this.productRepository.findOne(id);

    if (!product)
      throw new NotFoundException(
        `Product with id ${id} not found in database`,
      );

    return product;
  }

  async create(payload: CreateProductDto) {
    const newProduct = this.productRepository.create(payload);

    return await this.productRepository.save(newProduct);
  }

  async update(id: number, payload: UpdateProductDto) {
    const product = await this.findById(id);
    this.productRepository.merge(product, payload);

    return await this.productRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.findById(id);
    await this.productRepository.delete(id);

    return product;
  }
}
