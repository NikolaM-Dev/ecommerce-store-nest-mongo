import {
  Controller,
  Get,
  Param,
  HttpStatus,
  HttpCode,
  Post,
  Put,
  Delete,
  Body,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';
import { IsMongoIdPipe } from '../../../common/is-mongo-id.pipe';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'List of categories' })
  findMany() {
    return this.categoriesService.findMany();
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async findById(@Param('id', IsMongoIdPipe) id: string) {
    return await this.categoriesService.findById(id);
  }

  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.categoriesService.create(payload);
  }

  @Put(':id')
  async update(
    @Param('id', IsMongoIdPipe) id: string,
    @Body() payload: UpdateCategoryDto,
  ) {
    return await this.categoriesService.update(id, payload);
  }

  @Delete(':id')
  async remove(@Param('id', IsMongoIdPipe) id: string) {
    return await this.categoriesService.remove(id);
  }
}
