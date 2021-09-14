import { Controller, Get, UseGuards } from '@nestjs/common';

import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';
import { ApiKeyGuard } from './auth/guards/api-key.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Root')
@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Hello World!' })
  @Public()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('new')
  @ApiOperation({ summary: 'Return string "Hi i\'m new"' })
  new() {
    return "Hi i'm new";
  }

  @Get('tasks')
  @ApiOperation({ summary: 'List of tasks' })
  async findManyTasks() {
    return await this.appService.findManyTasks();
  }
}
