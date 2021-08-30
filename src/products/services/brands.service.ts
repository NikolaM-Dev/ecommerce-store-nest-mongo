import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Brand } from '../entities/brand.entity';
// import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dto';

@Injectable()
export class BrandsService {
  constructor(
    @InjectModel(Brand.name) private readonly brandModel: Model<Brand>,
  ) {}

  findMany() {
    return this.brandModel.find().exec();
  }

  async findById(id: number) {
    const brand = await this.brandModel.findById(id).exec();

    if (!brand)
      throw new NotFoundException(`Brand with id ${id} not found in database`);

    return brand;
  }

  // create(payload: CreateBrandDto) {
  //   const id = ++this.counterId;
  //   const newBrand = { id, ...payload };
  //   this.brands.push(newBrand);

  //   return newBrand;
  // }

  // update(id: number, payload: UpdateBrandDto) {
  //   const brand = this.findById(id);
  //   const index = this.brands.findIndex((brand) => brand.id === id);
  //   this.brands[index] = { ...brand, ...payload };

  //   return this.brands[index];
  // }

  // delete(id: number) {
  //   const brand = this.findById(id);
  //   this.brands = this.brands.filter((brand) => brand.id !== id);

  //   return brand;
  // }
}
