import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from './categories.dto';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Product name' })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Product description' })
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'Price of the product' })
  readonly price: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'Product stock' })
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({ description: 'Product stock' })
  readonly image: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'Product category', type: Category })
  @ValidateNested()
  readonly category: CreateCategoryDto;

  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({ description: 'Brand ID' })
  readonly brand: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductstDto {
  @IsOptional()
  @IsPositive()
  @ApiProperty({
    default: 10,
    description: 'Limit of products to list',
    required: false,
  })
  readonly limit: number;

  @IsOptional()
  @Min(0)
  @ApiProperty({
    default: 0,
    description: 'Offset of products to list',
    minimum: 0,
    required: false,
  })
  readonly offset: number;

  @IsOptional()
  @Min(0)
  @ApiProperty({
    default: undefined,
    description: 'Minimum product price',
    minimum: 1,
    required: false,
  })
  minPrice: number;

  @ValidateIf((params) => params.minPrice)
  @IsPositive()
  @ApiProperty({
    default: undefined,
    description: 'Maximum product price',
    minimum: 1,
    required: false,
  })
  maxPrice: number;
}
