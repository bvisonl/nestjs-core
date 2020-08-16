import { Module, Global } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthBasicStrategy } from './basic/auth.basic.strategy';
import { AuthJwtStrategy } from './jwt/auth.jwt.strategy';
import { AuthBasicGuard } from './basic/auth.basic.guard';
import { AuthApiKeyGuard } from './api-key/auth.api-key.guard';
import { AuthGuard } from './auth.guard';
import { AuthApiKeyStrategy } from './api-key/auth.api-key.strategy';
import { AuthJwtGuard } from './jwt/auth.jwt.guard';
import { AuthRolesGuard } from './auth.roles.guard';
import { AuthJwtRefreshGuard } from './jwt/auth.jwt-refresh.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthJwtRefreshToken } from './jwt/auth.jwt.refresh-token.entity';
import { AuthJwtRefreshTokenRepository } from './jwt/auth..jwt.refresh-token.repository';
import { AuthJwtService } from './jwt/auth.jwt.service';
import { EmployeeModule } from 'src/modules/employee/employee.module';

@Global()
@Module({
  imports: [
    EmployeeModule,
    TypeOrmModule.forFeature([AuthJwtRefreshToken, AuthJwtRefreshTokenRepository]),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthGuard,
    AuthRolesGuard,
    AuthBasicGuard,
    AuthBasicStrategy,
    AuthApiKeyGuard,
    AuthApiKeyStrategy,
    AuthJwtGuard,
    AuthJwtStrategy,
    AuthJwtRefreshGuard,
    AuthJwtService,
  ],
  exports: [AuthGuard, AuthBasicGuard, AuthJwtGuard, AuthApiKeyGuard, AuthRolesGuard],
})
export class AuthModule {}
