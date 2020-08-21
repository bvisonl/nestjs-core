import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { AuthJwtService } from './auth.jwt.service';

@Injectable()
export class AuthJwtRefreshGuard implements CanActivate {
  constructor(private authJwtService: AuthJwtService, private authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const authorization = (request.headers.authorization || '').split(' ')[1] || null;

    if (!authorization) {
      throw new HttpException('Invalid credentials.', HttpStatus.FORBIDDEN);
    }

    try {
      const token = await this.authJwtService.verifyRefreshToken(authorization);
      if (!token) {
        throw new HttpException('Invalid credentials.', HttpStatus.BAD_REQUEST);
      }

      const employee = await this.authService.findByUsername(request, token.username);

      // Validate credentials
      if (!employee) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }

      // Add the employee to the request
      request.user = employee;

      return true;
    } catch (err) {
      throw new HttpException('Invalid credentials.', HttpStatus.BAD_REQUEST);
    }

    return false;
  }
}
