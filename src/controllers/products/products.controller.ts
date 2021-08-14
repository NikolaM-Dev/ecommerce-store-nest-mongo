import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Controller('products')
export class ProductsController {
  @Get()
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ): { message: string } {
    return {
      message: `producsts: limit => ${limit} offset => ${offset} brand => ${brand}`,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id') id: string): { message: string } {
    return { message: `The product has an id: ${id}` };
  }

  @Post()
  create(@Body() payload: Product) {
    return {
      message: 'action for create',
      payload,
    };
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: Product) {
    return {
      message: `update product ${id}`,
      payload,
    };
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return {
      message: `delete product ${id}`,
    };
  }
}
