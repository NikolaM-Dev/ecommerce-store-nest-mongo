import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}
  findAll() {
    return this.productModel.find().exec();
  }

  async findById(id: string) {
    const product = await this.productModel.findById(id).exec();

    if (!product)
      throw new NotFoundException(
        `Product with id ${id} not found in database`,
      );

    return product;
  }

  // create(payload: CreateProductDto) {
  //   const id = ++this.counterId;
  //   const newProduct = { id, ...payload };
  //   this.products.push(newProduct);

  //   return newProduct;
  // }

  // update(id: number, payload: UpdateProductDto) {
  //   const product = this.findById(id);
  //   const index = this.products.findIndex((product) => product.id === id);
  //   this.products[index] = { ...product, ...payload };

  //   return this.products[index];
  // }

  // delete(id: number) {
  //   const product = this.findById(id);
  //   this.products = this.products.filter((product) => product.id !== id);

  //   return product;
  // }
}
