import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dto';

@Injectable()
export class BrandsService {
  constructor(
    @InjectModel(Brand.name) private readonly brandModel: Model<Brand>,
  ) {}

  findMany() {
    return this.brandModel.find().exec();
  }

  async findById(id: string) {
    const brand = await this.brandModel.findById(id).exec();

    if (!brand) throw new NotFoundException(`Brand with id ${id} not found`);

    return brand;
  }

  create(payload: CreateBrandDto) {
    const newBrand = new this.brandModel(payload);

    return newBrand.save();
  }

  async update(id: string, payload: UpdateBrandDto) {
    const brand = await this.brandModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();

    if (!brand) throw new NotFoundException(`Brand with id ${id} not found`);

    return brand;
  }

  async remove(id: string) {
    await this.findById(id);

    return this.brandModel.findByIdAndDelete(id);
  }
}
