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
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { BrandsService } from '../services/brands.service';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dto';
import { IsMongoIdPipe } from 'src/common';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get()
  @ApiOperation({ summary: 'List of brands' })
  findMany() {
    return this.brandsService.findMany();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a brand  by ID' })
  @HttpCode(HttpStatus.ACCEPTED)
  async findById(@Param('id', IsMongoIdPipe) id: string) {
    return await this.brandsService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a brand' })
  create(@Body() payload: CreateBrandDto) {
    return this.brandsService.create(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a brand by ID' })
  async update(
    @Param('id', IsMongoIdPipe) id: string,
    @Body() payload: UpdateBrandDto,
  ) {
    return await this.brandsService.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a brand by ID' })
  async remove(@Param('id', IsMongoIdPipe) id: string) {
    return await this.brandsService.remove(id);
  }
}
