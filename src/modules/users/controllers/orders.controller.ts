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

import { OrdersService } from '../services/orders.service';
import { IsMongoIdPipe } from '../../../common/is-mongo-id.pipe';
import {
  CreateOrderDto,
  UpdateOrderDto,
  AddProductstoOderDto,
} from '../dtos/orders.dto';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly odersService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: 'List of orders' })
  findMany() {
    return this.odersService.findMany();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a order by ID' })
  @HttpCode(HttpStatus.ACCEPTED)
  async findById(@Param('id', IsMongoIdPipe) id: string) {
    return await this.odersService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a order' })
  create(@Body() payload: CreateOrderDto) {
    return this.odersService.create(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a order by ID' })
  async update(
    @Param('id', IsMongoIdPipe) id: string,
    payload: UpdateOrderDto,
  ) {
    return await this.odersService.update(id, payload);
  }

  @Put(':id/products')
  @ApiOperation({ summary: 'Create a product in the order with ID' })
  async updateProducts(
    @Param('id', IsMongoIdPipe) id: string,
    @Body() payload: AddProductstoOderDto,
  ) {
    return await this.odersService.addProduct(id, payload.productsIds);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a order by ID' })
  async remove(@Param('id', IsMongoIdPipe) id: string) {
    return await this.odersService.remove(id);
  }

  @Delete(':id/products/:productId')
  @ApiOperation({ summary: 'Remove a product by ID in the order with ID' })
  async removeProduct(
    @Param('id', IsMongoIdPipe) id: string,
    @Param('productId', IsMongoIdPipe) productId: string,
  ) {
    return this.odersService.removeProduct(id, productId);
  }
}
