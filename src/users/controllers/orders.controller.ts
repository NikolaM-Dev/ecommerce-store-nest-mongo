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
import { IsMongoIdPipe } from '../../common/is-mongo-id.pipe';
import { CreateOrderDto } from '../dtos/orders.dto';
import { UpdateBrandDto } from '../../products/dtos/brands.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly odersService: OrdersService) {}

  @Get()
  findMany() {
    return this.odersService.findMany();
  }

  @Get('id')
  @HttpCode(HttpStatus.ACCEPTED)
  async findById(@Param('id', IsMongoIdPipe) id: string) {
    return await this.odersService.findById(id);
  }

  @Post()
  create(@Body() payload: CreateOrderDto) {
    return this.odersService.create(payload);
  }

  @Put('id')
  async update(
    @Param('id', IsMongoIdPipe) id: string,
    payload: UpdateBrandDto,
  ) {
    return await this.odersService.update(id, payload);
  }

  @Delete('id')
  async remove(@Param('id', IsMongoIdPipe) id: string) {
    return await this.odersService.remove(id);
  }
}
