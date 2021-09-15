import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'User email' })
  readonly email: string;

  @IsString()
  @Length(6)
  @IsNotEmpty()
  @ApiProperty({ description: 'User password' })
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'User role', enum: ['admin, customer'] })
  readonly role: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
