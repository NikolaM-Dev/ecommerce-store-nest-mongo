import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateProductDto, UpdateProductDto } from 'src/dtos/products.dto';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class ProductsService {
  private counterId = 0;
  private products: Array<Product> = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      price: 122,
      stock: 12,
      image: 'http/product/1',
    },
  ];

  findAll() {
    return this.products;
  }

  findById(id: number) {
    const product = this.products.find((product) => product.id === id);

    if (!product)
      throw new NotFoundException(
        `Product with id ${id} not found in database`,
      );

    return product;
  }

  create(payload: CreateProductDto) {
    const id = ++this.counterId;
    const newProduct = { id, ...payload };
    this.products.push(newProduct);

    return newProduct;
  }

  update(id: number, payload: UpdateProductDto) {
    const product = this.findById(id);
    const index = this.products.findIndex((product) => product.id === id);
    this.products[index] = { ...product, ...payload };

    return this.products[index];
  }

  delete(id: number) {
    const product = this.findById(id);
    this.products = this.products.filter((product) => product.id !== id);

    return product;
  }
}
