import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

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
