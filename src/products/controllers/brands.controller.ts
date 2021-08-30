import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BrandsService } from '../services/brands.service';
// import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dto';
import { ParseIntPipe } from 'src/common/parse-int.pipe';

@ApiTags('brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get()
  findMany() {
    return this.brandsService.findMany();
  }

  @Get('id')
  @HttpCode(HttpStatus.ACCEPTED)
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.brandsService.findById(id);
  }

  // @Post()
  // create(@Body() payload: CreateBrandDto) {
  //   return this.brandsService.create(payload);
  // }

  // @Put('id')
  // update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() payload: UpdateBrandDto,
  // ) {
  //   return this.brandsService.update(id, payload);
  // }

  // @Delete('id')
  // delete(@Param('id', ParseIntPipe) id: number) {
  //   return this.brandsService.delete(id);
  // }
}
