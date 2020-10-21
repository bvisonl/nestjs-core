import { Module, Global, DynamicModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
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
import { AuthService } from './auth.service';
import * as env from 'env-var';

@Module({})
export class AuthModule {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static register(config): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        ...config.imports,
        TypeOrmModule.forFeature([AuthJwtRefreshToken, AuthJwtRefreshTokenRepository]),
        PassportModule,
        JwtModule.registerAsync({
          useFactory: async () => ({
            secret: env
              .get('JWT_ACCESS_TOKEN_SECRET')
              .required()
              .asString(),
          }),
          inject: [],
        }),
      ],
      controllers: [AuthController],
      providers: [
        ...config.providers,
        AuthService,
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
    };
  }
}
