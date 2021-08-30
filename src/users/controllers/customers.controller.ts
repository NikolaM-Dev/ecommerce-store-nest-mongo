import { Controller, Get, Param, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dto';
import { CustomersService } from '../services/customers.service';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  findMany() {
    return this.customersService.findMany();
  }

  @Get('id')
  @HttpCode(HttpStatus.ACCEPTED)
  async findById(@Param('id') id: string) {
    return await this.customersService.findById(id);
  }

  // @Post()
  // create(@Body() payload: CreateCustomerDto) {
  //   return this.customersService.create(payload);
  // }

  // @Put('id')
  // update(@Param('id', ParseIntPipe) id: number, payload: UpdateCustomerDto) {
  //   return this.customersService.update(id, payload);
  // }
}
