import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string) {
    const parseValue = parseInt(value, 10);

    if (isNaN(parseValue))
      throw new BadRequestException(`${value} is not an number`);

    return parseValue;
  }
}
