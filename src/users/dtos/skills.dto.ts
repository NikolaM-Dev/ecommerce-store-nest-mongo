import { IsNotEmpty, IsString } from 'class-validator';

export class Skills {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly color: string;
}
