import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductstDto,
} from '../dtos/products.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async findMany(params?: FilterProductstDto) {
    const { limit = 5, offset = 0, minPrice, maxPrice } = params;
    const filters: FilterQuery<Product> = {};

    if (minPrice && maxPrice)
      filters.price = { $gte: minPrice, $lte: maxPrice };

    const [total, products] = await Promise.all([
      this.productModel.countDocuments(),
      this.productModel
        .find(filters)
        .populate('brand')
        .skip(offset * limit)
        .limit(limit)
        .exec(),
    ]);

    return { total, products };
  }

  async findById(id: string) {
    const product = await this.productModel
      .findById(id)
      .populate('brand')
      .exec();

    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

    return product;
  }

  create(payload: CreateProductDto) {
    const newProduct = new this.productModel(payload).populate('brand');

    return newProduct.save();
  }

  async update(id: string, payload: UpdateProductDto) {
    const product = await this.productModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .populate('brand')
      .exec();

    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

    return product;
  }

  async remove(id: string) {
    await this.findById(id);

    return this.productModel.findByIdAndDelete(id).populate('brand');
  }
}
