import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Brand name' })
  readonly name: string;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({ description: 'Image URL' })
  readonly image: string;
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
