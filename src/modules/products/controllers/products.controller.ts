import {
  Controller,
  Get,
  Param,
  HttpStatus,
  HttpCode,
  Post,
  Body,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';

import {
  CreateProductDto,
  FilterProductstDto,
  UpdateProductDto,
} from '../dtos/products.dto';
import { IsMongoIdPipe } from '../../../common/is-mongo-id.pipe';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { ProductsService } from '../services/products.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { Role } from 'src/auth/models/role.model';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from '../../../auth/guards/roles.guard';

@ApiTags('products')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Public()
  @ApiOperation({ summary: 'List of products' })
  @Get()
  async findMany(@Query() params: FilterProductstDto) {
    return await this.productsService.findMany(params);
  }

  @Public()
  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async findById(@Param('id', IsMongoIdPipe) id: string) {
    return await this.productsService.findById(id);
  }

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  update(
    @Param('id', IsMongoIdPipe) id: string,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(id, payload);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id', IsMongoIdPipe) id: string) {
    return this.productsService.remove(id);
  }
}