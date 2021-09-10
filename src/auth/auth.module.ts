import { ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersModule } from '../users/users.module';
import config from 'src/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.jwt.secret,
          signOptions: { expiresIn: configService.jwt.expiresIn },
        };
      },
      inject: [config.KEY],
    }),
    UsersModule,
    PassportModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
