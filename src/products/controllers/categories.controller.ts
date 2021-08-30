import { Controller, Get, Param, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CategoriesService } from '../services/categories.service';
// import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'List of categories' })
  findMany() {
    return this.categoriesService.findMany();
  }

  @Get('id')
  @HttpCode(HttpStatus.ACCEPTED)
  findById(@Param('id') id: string) {
    return this.categoriesService.findById(id);
  }

  // @Post()
  // create(@Body() payload: CreateCategoryDto) {
  //   return this.categoriesService.create(payload);
  // }

  // @Put('id')
  // update(@Param('id') id: string, @Body() payload: UpdateCategoryDto) {
  //   return this.categoriesService.update(id, payload);
  // }

  // @Delete('id')
  // delete(@Param('id') id: string) {
  //   return this.categoriesService.delete(id);
  // }
}
