import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { UsersService } from '../services/users.service';

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
  findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Get(':id/orders')
  @HttpCode(HttpStatus.ACCEPTED)
  findOrder(@Param('id') id: string) {
    return this.usersService.findOrderByUser(id);
  }

  // @Post()
  // create(@Body() payload: CreateUserDto) {
  //   return this.usersService.create(payload);
  // }

  // @Put(':id')
  // update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() payload: UpdateUserDto,
  // ) {
  //   return this.usersService.update(id, payload);
  // }

  // @Delete(':id')
  // delete(@Param('id', ParseIntPipe) id: number) {
  //   return this.usersService.delete(id);
  // }
}
