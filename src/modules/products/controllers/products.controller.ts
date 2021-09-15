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
import { IsMongoIdPipe } from 'src/common';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guards';
import { ProductsService } from '../services/products.service';
import { Public, Roles } from 'src/auth/decorators';
import { Role } from 'src/auth/models';

@ApiTags('Products')
@UseGuards(JwtAuthGuard, RolesGuard)
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
  @ApiOperation({ summary: 'Find a product by ID' })
  @HttpCode(HttpStatus.ACCEPTED)
  async findById(@Param('id', IsMongoIdPipe) id: string) {
    return await this.productsService.findById(id);
  }

  @Roles(Role.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Create a product' })
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  @ApiOperation({ summary: 'Update a product by ID' })
  update(
    @Param('id', IsMongoIdPipe) id: string,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(id, payload);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Remove a product by ID' })
  remove(@Param('id', IsMongoIdPipe) id: string) {
    return this.productsService.remove(id);
  }
}
