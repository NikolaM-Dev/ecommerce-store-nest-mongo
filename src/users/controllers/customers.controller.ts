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
import { ApiTags } from '@nestjs/swagger';

import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dto';
import { CustomersService } from '../services/customers.service';
import { IsMongoIdPipe } from '../../common/is-mongo-id.pipe';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  findMany() {
    return this.customersService.findMany();
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async findById(@Param('id', IsMongoIdPipe) id: string) {
    return await this.customersService.findById(id);
  }

  @Post()
  create(@Body() payload: CreateCustomerDto) {
    return this.customersService.create(payload);
  }

  @Put(':id')
  async update(
    @Param('id', IsMongoIdPipe) id: string,
    payload: UpdateCustomerDto,
  ) {
    return await this.customersService.update(id, payload);
  }

  @Delete(':id')
  async remove(@Param('id', IsMongoIdPipe) id: string) {
    return await this.customersService.remove(id);
  }
}
