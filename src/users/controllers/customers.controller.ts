import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';

import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dto';
import { CustomersService } from '../services/customers.service';
import { ParseIntPipe } from 'src/common/parse-int.pipe';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  getAll() {
    return this.customersService.findAll();
  }

  @Get('id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.findById(id);
  }

  @Post()
  create(@Body() payload: CreateCustomerDto) {
    return this.customersService.create(payload);
  }

  @Put('id')
  update(@Param('id', ParseIntPipe) id: number, payload: UpdateCustomerDto) {
    return this.customersService.update(id, payload);
  }
}
