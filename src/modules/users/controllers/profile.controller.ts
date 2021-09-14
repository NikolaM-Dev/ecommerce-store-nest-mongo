import { Controller, Req, Get, UseGuards } from '@nestjs/common';

import { Role } from 'src/auth/models/role.model';
import { Roles } from '../../../auth/decorators/roles.decorator';
import { PayloadToken } from '../../../auth/models/token.model';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { OrdersService } from '../services/orders.service';
import { Request } from 'express';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly ordersService: OrdersService) {}

  @Roles(Role.CUSTOMER)
  @Get('my-orders')
  findManyOrders(@Req() req: Request) {
    const user = req.user as PayloadToken;

    return this.ordersService.findManyByCustomer(user.sub);
  }
}
