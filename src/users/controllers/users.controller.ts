import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { UsersService } from '../services/users.service';
import { IsMongoIdPipe } from '../../common/is-mongo-id.pipe';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findMany() {
    return this.usersService.findMany();
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async findById(@Param('id', IsMongoIdPipe) id: string) {
    return await this.usersService.findById(id);
  }

  @Get(':id/orders')
  @HttpCode(HttpStatus.ACCEPTED)
  async findOrderByUserId(@Param('id', IsMongoIdPipe) id: string) {
    return await this.usersService.findOrderByUserId(id);
  }

  @Post()
  async create(@Body() payload: CreateUserDto) {
    return await this.usersService.create(payload);
  }

  @Put(':id')
  async update(
    @Param('id', IsMongoIdPipe) id: string,
    @Body() payload: UpdateUserDto,
  ) {
    return await this.usersService.update(id, payload);
  }

  @Delete(':id')
  async remove(@Param('id', IsMongoIdPipe) id: string) {
    return await this.usersService.remove(id);
  }
}
