import { Controller, Post, Request, UseGuards } from '@nestjs/common';

import { AuthJwtService } from './jwt/auth.jwt.service';
import AuthJwtTokenDto from './jwt/auth.jwt.token.dto';
import { AuthJwtRefreshGuard } from './jwt/auth.jwt-refresh.guard';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authJwtService: AuthJwtService) {}

  @UseGuards(AuthGuard)
  @Post('/')
  async authToken(@Request() req): Promise<AuthJwtTokenDto> {
    const payload = { username: req.user.email, sub: req.user.id };
    return this.authJwtService.generateToken(payload);
  }

  @UseGuards(AuthJwtRefreshGuard)
  @Post('/refreshToken')
  async refreshToken(@Request() req): Promise<AuthJwtTokenDto> {
    const payload = { username: req.user.email, sub: req.user.id };
    return this.authJwtService.generateToken(payload);
  }
}
