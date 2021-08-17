import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';

import { CustomersService } from 'src/services/customers/customers.service';
import { CreateCustomerDto } from 'src/dtos/customers.dto';
import { ParseIntPipe } from 'src/common/parse-int.pipe';
import { UpdateCustomerDto } from 'src/dtos/customers.dto';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  getAll() {
    return this.customersService.findAll();
  }

  @Get('id')
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
