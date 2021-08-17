import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  readonly name: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
