import { Injectable, CanActivate, ExecutionContext, HttpStatus, HttpException } from '@nestjs/common';
import { Request } from 'express';
import { AuthBasicGuard } from './basic/auth.basic.guard';
import { AuthApiKeyGuard } from './api-key/auth.api-key.guard';
import { AuthJwtGuard } from './jwt/auth.jwt.guard';
import { AuthRolesGuard } from './auth.roles.guard';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authBasicGuard: AuthBasicGuard,
    private authJwtGuard: AuthJwtGuard,
    private authApiKeyGuard: AuthApiKeyGuard,
    private authRolesGuard: AuthRolesGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authorization = request.headers.authorization;

    // Validate credentials
    let isAuthenticated = false;
    if (authorization && authorization.indexOf('Basic') != -1) {
      await this.authBasicGuard.canActivate(context);
      isAuthenticated = true;
    } else if (authorization && authorization.indexOf('Bearer') != -1) {
      await this.authJwtGuard.canActivate(context);
      isAuthenticated = true;
    } else if (request.query.apiKey) {
      await this.authApiKeyGuard.canActivate(context);
      isAuthenticated = true;
    }

    if (!isAuthenticated) {
      throw new HttpException('Unauthorized', HttpStatus.FORBIDDEN);
    }

    // Validate roles
    await this.authRolesGuard.canActivate(context);

    // If all validation passed allow request
    return true;
  }
}
