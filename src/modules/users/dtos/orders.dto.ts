import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsDate, IsArray } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({ description: 'Customer ID' })
  readonly customer: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({ description: 'Date of the order' })
  readonly date: Date;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ description: 'Product ID list', type: [String] })
  readonly products: string[];
}

export class UpdateOrderDto extends PartialType(
  OmitType(CreateOrderDto, ['products']),
) {}

export class AddProductstoOderDto {
  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ description: 'Product ID list', type: [String] })
  readonly productsIds: string[];
}
