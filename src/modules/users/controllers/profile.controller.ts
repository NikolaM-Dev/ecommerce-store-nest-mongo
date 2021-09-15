import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Controller, Req, Get, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { JwtAuthGuard, RolesGuard } from 'src/auth/guards';
import { OrdersService } from '../services/orders.service';
import { PayloadToken, Role } from 'src/auth/models';
import { Roles } from 'src/auth/decorators';

@ApiTags('Profile')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly ordersService: OrdersService) {}

  @Roles(Role.CUSTOMER)
  @Get('my-orders')
  @ApiOperation({ summary: 'Customer order list' })
  findManyOrders(@Req() req: Request) {
    const user = req.user as PayloadToken;

    return this.ordersService.findManyByCustomer(user.sub);
  }
}
