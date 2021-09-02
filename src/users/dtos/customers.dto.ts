import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { CreateSkillDto } from './skills.dto';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly lastName: string;

  @IsPhoneNumber('CO')
  @IsNotEmpty()
  readonly phone: string;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateSkillDto)
  readonly skills: CreateSkillDto[];
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
