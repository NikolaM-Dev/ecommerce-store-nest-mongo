import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateSkillDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Skill name' })
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Skill color' })
  readonly color: string;
}

export class UpdateSkillDto extends PartialType(CreateSkillDto) {}
