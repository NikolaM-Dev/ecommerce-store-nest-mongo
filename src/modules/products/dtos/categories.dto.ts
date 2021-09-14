import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Category name' })
  readonly name: string;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({ description: 'Image URL' })
  readonly image: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
