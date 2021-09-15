import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, UseGuards } from '@nestjs/common';

import { ApiKeyGuard } from './auth/guards';
import { AppService } from './app.service';
import { Public } from './auth/decorators';

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
}
