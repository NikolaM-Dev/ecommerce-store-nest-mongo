import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { CreateSkillDto } from './skills.dto';
import { Skill } from '../entities/skill.entity';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Customer name' })
  readonly name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Customer lastname', required: false })
  readonly lastName: string;

  @IsPhoneNumber('CO')
  @IsNotEmpty()
  @ApiProperty({ description: 'Customer phone number' })
  readonly phone: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ description: 'Customer skills', type: () => [Skill] })
  @ValidateNested({ each: true })
  @Type(() => CreateSkillDto)
  readonly skills: CreateSkillDto[];
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
