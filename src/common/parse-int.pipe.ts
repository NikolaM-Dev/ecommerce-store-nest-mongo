import {
  BadRequestException,
  Injectable,
  PipeTransform,
  ArgumentMetadata,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const parseValue = parseInt(value, 10);

    if (isNaN(parseValue))
      throw new BadRequestException(`${value} is not an number`);

    return parseValue;
  }
}
