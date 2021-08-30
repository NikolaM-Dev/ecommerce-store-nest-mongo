import { Controller, Get, Param, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
import { ProductsService } from '../services/products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  findMany() {
    return this.productsService.findMany();
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async findById(@Param('id') id: string) {
    return await this.productsService.findById(id);
  }

  // @Post()
  // create(@Body() payload: CreateProductDto) {
  //   return this.productsService.create(payload);
  // }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() payload: UpdateProductDto) {
  //   return this.productsService.update(id, payload);
  // }

  // @Delete(':id')
  // delete(@Param('id') id: string) {
  //   return this.productsService.delete(id);
  // }
}
