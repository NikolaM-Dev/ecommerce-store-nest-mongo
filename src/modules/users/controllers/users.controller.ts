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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { UsersService } from '../services/users.service';
import { IsMongoIdPipe } from '../../../common/is-mongo-id.pipe';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'List of users' })
  findMany() {
    return this.usersService.findMany();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a user by ID' })
  @HttpCode(HttpStatus.ACCEPTED)
  async findById(@Param('id', IsMongoIdPipe) id: string) {
    return await this.usersService.findById(id);
  }

  @Get(':id/orders')
  @ApiOperation({ summary: 'List all user orders with ID' })
  @HttpCode(HttpStatus.ACCEPTED)
  async findOrderByUserId(@Param('id', IsMongoIdPipe) id: string) {
    return await this.usersService.findOrderByUserId(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  async create(@Body() payload: CreateUserDto) {
    return await this.usersService.create(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  async update(
    @Param('id', IsMongoIdPipe) id: string,
    @Body() payload: UpdateUserDto,
  ) {
    return await this.usersService.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a user by ID' })
  async remove(@Param('id', IsMongoIdPipe) id: string) {
    return await this.usersService.remove(id);
  }
}
