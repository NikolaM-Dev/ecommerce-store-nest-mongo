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
import { UseGuards } from '@nestjs/common';

import {
  CreateProductDto,
  FilterProductstDto,
  UpdateProductDto,
} from '../dtos/products.dto';
import { IsMongoIdPipe } from '../../common/is-mongo-id.pipe';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ProductsService } from '../services/products.service';
import { Public } from 'src/auth/decorators/public.decorator';

@ApiTags('products')
@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Public()
  @ApiOperation({ summary: 'List of products' })
  @Get()
  async findMany(@Query() params: FilterProductstDto) {
    return await this.productsService.findMany(params);
  }

  @Public()
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
