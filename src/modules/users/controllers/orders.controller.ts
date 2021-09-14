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

import { OrdersService } from '../services/orders.service';
import { IsMongoIdPipe } from '../../../common/is-mongo-id.pipe';
import {
  CreateOrderDto,
  UpdateOrderDto,
  AddProductstoOderDto,
} from '../dtos/orders.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly odersService: OrdersService) {}

  @Get()
  findMany() {
    return this.odersService.findMany();
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async findById(@Param('id', IsMongoIdPipe) id: string) {
    return await this.odersService.findById(id);
  }

  @Post()
  create(@Body() payload: CreateOrderDto) {
    return this.odersService.create(payload);
  }

  @Put(':id')
  async update(
    @Param('id', IsMongoIdPipe) id: string,
    payload: UpdateOrderDto,
  ) {
    return await this.odersService.update(id, payload);
  }

  @Put(':id/products')
  async updateProducts(
    @Param('id', IsMongoIdPipe) id: string,
    @Body() payload: AddProductstoOderDto,
  ) {
    return await this.odersService.addProduct(id, payload.productsIds);
  }

  @Delete(':id')
  async remove(@Param('id', IsMongoIdPipe) id: string) {
    return await this.odersService.remove(id);
  }

  @Delete(':id/products/:productId')
  async removeProduct(
    @Param('id', IsMongoIdPipe) id: string,
    @Param('productId', IsMongoIdPipe) productId: string,
  ) {
    return this.odersService.removeProduct(id, productId);
  }
}
