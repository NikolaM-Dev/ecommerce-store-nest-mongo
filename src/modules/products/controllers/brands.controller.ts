import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BrandsService } from '../services/brands.service';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dto';
import { IsMongoIdPipe } from '../../../common/is-mongo-id.pipe';

@ApiTags('brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get()
  findMany() {
    return this.brandsService.findMany();
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async findById(@Param('id', IsMongoIdPipe) id: string) {
    return await this.brandsService.findById(id);
  }

  @Post()
  create(@Body() payload: CreateBrandDto) {
    return this.brandsService.create(payload);
  }

  @Put(':id')
  async update(
    @Param('id', IsMongoIdPipe) id: string,
    @Body() payload: UpdateBrandDto,
  ) {
    return await this.brandsService.update(id, payload);
  }

  @Delete(':id')
  async remove(@Param('id', IsMongoIdPipe) id: string) {
    return await this.brandsService.remove(id);
  }
}
