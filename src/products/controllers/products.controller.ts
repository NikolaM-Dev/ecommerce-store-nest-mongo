import {
  Controller,
  Get,
  Param,
  HttpStatus,
  HttpCode,
  Post,
  Body,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import {
  CreateProductDto,
  FilterProductstDto,
  UpdateProductDto,
} from '../dtos/products.dto';
import { IsMongoIdPipe } from '../../common/is-mongo-id.pipe';
import { ProductsService } from '../services/products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @ApiOperation({ summary: 'List of products' })
  @Get()
  async findMany(@Query() params: FilterProductstDto) {
    return await this.productsService.findMany(params);
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async findById(@Param('id', IsMongoIdPipe) id: string) {
    return await this.productsService.findById(id);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', IsMongoIdPipe) id: string,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', IsMongoIdPipe) id: string) {
    return this.productsService.remove(id);
  }
}
