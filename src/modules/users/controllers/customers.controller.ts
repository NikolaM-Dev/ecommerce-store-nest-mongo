import { ApiTags, ApiOperation } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Param,
  HttpStatus,
  HttpCode,
  Delete,
  Post,
  Put,
} from '@nestjs/common';
import { IsMongoIdPipe } from 'src/common';

import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dto';
import { CustomersService } from '../services/customers.service';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  @ApiOperation({ summary: 'List of customers' })
  findMany() {
    return this.customersService.findMany();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a customer by ID' })
  @HttpCode(HttpStatus.ACCEPTED)
  async findById(@Param('id', IsMongoIdPipe) id: string) {
    return await this.customersService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a customer' })
  create(@Body() payload: CreateCustomerDto) {
    return this.customersService.create(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a customer by ID' })
  async update(
    @Param('id', IsMongoIdPipe) id: string,
    payload: UpdateCustomerDto,
  ) {
    return await this.customersService.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a customer by ID' })
  async remove(@Param('id', IsMongoIdPipe) id: string) {
    return await this.customersService.remove(id);
  }
}
