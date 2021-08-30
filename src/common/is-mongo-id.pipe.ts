import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { isMongoId } from 'class-validator';

@Injectable()
export class IsMongoIdPipe implements PipeTransform {
  transform(value: string) {
    if (!isMongoId(value))
      throw new BadRequestException(`${value}, is not a a valid ID`);

    return value;
  }
}
