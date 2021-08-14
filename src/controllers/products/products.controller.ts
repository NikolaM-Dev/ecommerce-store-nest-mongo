import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ): string {
    return `producsts: limit => ${limit} offset => ${offset} brand => ${brand}`;
  }

  @Get('filter')
  getProductFilter(): string {
    return "i'm a filter";
  }

  @Get(':id')
  getProduct(@Param('id') id: string): string {
    return `The product has an id: ${id}`;
  }
}
